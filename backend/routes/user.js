const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Property = require("../models/Property");
const formidable = require("formidable");
const fs = require("fs");
const multer = require('multer');
const bcrypt = require("bcryptjs");
const path = require('path');
const nodemailer = require("nodemailer");


router.post("/fetchUserData", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  res.status(200).json({ user: user });
});

router.get("/getUserDetails/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findById(user_id).select('-password'); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ userData: user, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error", error: "Internal Server Error" });
  }
});

router.patch('/updateuser/:id', async (req, res) => {
  console.log("here its ",req.body)
    try {
        const user_id = req.params.id;
        const {firstName, lastName, phoneNo, password} = req.body;
        console.log("editbody",req.body);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updateUser = await User.findOneAndUpdate({_id:user_id}, { password:hashedPassword, firstName, lastName, phoneNo }, { upsert: true })
        if (updateUser.nModified === 0) {
            return res.status(404).json({ error: "User Details failed to update!" });
        }
        return res.status(201).json({ updateUser, message: "ok" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
})


const storage1 = multer.diskStorage({
  destination: __dirname+'profilePic/', 
  filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname));
  },
});
const upload1 = multer({ storage: storage1 });

router.post('/imageUpload/:userId', upload1.single('userImg'), async (req, res) => {
  const {userId} = req.params;
  try {

    const imageUrl = req.file.path;
    const imgName = req.file.originalname;

    const updateUser = await User.findOneAndUpdate({_id:userId}, { imageUrl: imageUrl}, { upsert: true })

    if(updateUser){
      res.status(201).json({ message: "ok", imageUrl:imageUrl});
    }
    else{
      res.status(500).json({ message: 'Failed To upload' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: __dirname+'uploads/', 
  filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/saveProperty/:sellerId', upload.single('images'), async (req, res) => {
  try {
    const {sellerId} = req.params;
    console.log("sellerId",sellerId);
    console.log("req.body",req.body);

    // const { files } = req;
    const {title, description, price, place, area, bathrooms, bedrooms, nearby_hospitals, nearby_colleges} =req.body;
    const imagePaths = req.file.path;
    console.log("imagePaths",imagePaths);

    

    const property = Property.create({
      title, description, price, place, area, bathrooms, bedrooms, nearby_hospitals, nearby_colleges,
      images: imagePaths,
      sellerId: sellerId
    });
    res.status(201).json({ message: "ok", property});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/getListedRooms/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const properties = await Property.find({sellerId:user_id }); 
    if (!properties) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ data: properties, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error", error: "Internal Server Error" });
  }
});

router.get("/getProperties", async (req, res) => {
  try {
    const properties = await Property.find(); 
    if (!properties) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ data: properties, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error", error: "Internal Server Error" });
  }
});


router.post('/sendEmails/:userId', async (req, res) => {
  const {userId} = req.params;
  const property = req.body;
  const sellerId = property.sellerId;
  try {

    console.log("userId",userId)
    console.log("sellerId",sellerId)

    const buyerInfo = await User.findById(userId);
    const sellerInfo = await User.findById(sellerId);


    const transporter = nodemailer.createTransport({
      service: 'gmail', // Example: 'gmail'
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMINSTRATION_EMAIL, // Your email address
        pass: process.env.ADMINSTRATION_PSW, // Your email password
      },
    });
                          
    // Construct the email message
    const mailOptions = {
      from: process.env.ADMINSTRATION_EMAIL,
      to: sellerInfo.email,
      subject: 'Someone interested in your property',
      html: `
        <h2>Somone want interested in your listed property at Rentify. Below is the details</h2>

        <img src="${process.env.DOMAIN +'/'+ property.images}" width="100" height="100"/>

        <p>Property: ${property.title}</p>
        <p>${property.title} </p>
        <p>Price : ₹ ${property.price} /month </p>
        <p>Place : ${property.place}, ${property.area} </p>
        <p>BathRooms : ${property.bathrooms} </p>
        <p>BedRooms : ${property.bedrooms} </p>
        <p>Nearby Hospitals : ${property.nearby_hospitals} </p>
        <p>Nearby Colleges : ${property.nearby_colleges} </p>

        <br/>
        <h2> Buyer's Info </h2>
        <p> Name: ${buyerInfo.firstName} ${buyerInfo.lastName}</p>
        <p>Contact No:  ${buyerInfo.phoneNo}</p>
        <p>Email:  ${buyerInfo.email}</p>
      `,
    };

    const mailOptions2 = {
      from: process.env.ADMINSTRATION_EMAIL,
      to: buyerInfo.email,
      subject: 'Connect with Room seller',
      html: `
        <h2>You found your interested room at Rentify.</h2>
        <img src=${process.env.DOMAIN +'/'+ property.images} alt=${process.env.DOMAIN +'/'+ property.images} width="100" height="100"/>
        <p>Below is the details</p>
        <p>Property: ${property.title}</p>
        <p>${property.title} </p>
        <p>Price : ₹ ${property.price} /month </p>
        <p>Place : ${property.place}, ${property.area} </p>
        <p>BathRooms : ${property.bathrooms} </p>
        <p>BedRooms : ${property.bedrooms} </p>
        <p>Nearby Hospitals : ${property.nearby_hospitals} </p>
        <p>Nearby Colleges : ${property.nearby_colleges} </p>

        <br/>
        <h2> Seller's Info </h2>
        <p> Name: ${sellerInfo.firstName} ${sellerInfo.lastName}</p>
        <p>Contact No:  ${sellerInfo.phoneNo}</p>
        <p>Email:  ${sellerInfo.email}</p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(mailOptions2);

    res.status(201).json({ message: "ok"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete("/deleteRoom/:id", async (req, res) => {
  const property_id = req.params.id;
  try {
    const data = await Property.deleteOne({_id:property_id});
    res.status(200).json({message: "ok", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error", error: "Unable to delete the property" });
  }
});

router.patch('/updateRoom/:id', async (req, res) => {
  // console.log("here its ",req.body)
    try {
        const propertyId = req.params.id;
        const propertyData = req.body;

        const updatedProperty = await Property.findOneAndUpdate({_id:propertyId}, propertyData, { upsert: true, new: true })
        if (updatedProperty.nModified === 0) {
            return res.status(404).json({ message: "User Details failed to update!" });
        }
        return res.status(201).json({message: "ok", data:updatedProperty });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
})

router.patch('/updateRoomWithImage/:id', upload.single('images'), async (req, res) => {
  try {
    const {id} = req.params;
    const imagePath = req.file.path;
    console.log("imagePath",imagePath);

    const property = await Property.findOneAndUpdate({_id:id },{...req.body, images:imagePath },{new: true });

    res.status(201).json({ message: "ok", data:property});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
