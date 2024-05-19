import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { updateUser,uploadProfilePic, getUserDetails } from '../controllers/backendRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { MainContext } from "../App";
import EditIcon from '@mui/icons-material/Edit';

import {
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
const base = process.env.REACT_APP_BASE;

const EditProfile = () => {
    const { isLoading,  toggleLoading,userprofilepic, setUserprofilepic } = useContext(MainContext);
    const [userData, setUserData]= useState();
    const [image, setImage] = useState(null);
    const [rawImage, setRawImage] = useState(null);
    const [isEditImage, setIsEditImage] = useState(false)
    const [userId, setUserId]= useState("");
    const [uploadLoad, setUploadLoad]=useState(false);
    const navigate = useNavigate();

    const [profilepic, setProfilepic] = useState(null);

     useEffect(() => {
      const token = localStorage.getItem('token');
      const id= localStorage.getItem("userId");
      setUserId(id);
      if (!token) {
        navigate("/login");
      } 
      toggleLoading(true)
      if(id){
        console.log("hello dear")
        getUserDetails(id).then((resp)=>{
            // console.log("myprofileroute",resp)
            if(resp.message==="ok"){
                setUserData(resp.userData);
                if(resp.userData.imageUrl!=""){
                    setProfilepic(base+'/'+ resp.userData.imageUrl)
                }
            }
        })
      }
    toggleLoading(false);

    },[]);

    const [confirmPsw, setConfirmPsw] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: '',
    });
    const handleFormChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submit Clicked",formData);
        if(formData.password !== confirmPsw){
            toast.error("Password is not matching!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if(formData.password &&  formData.phoneNo && formData.lastName && formData.firstName){
            toggleLoading(true);

            updateUser(formData,userId).then((json)=>{
                console.log("json",json)
                if (json.message === "ok") {
                    // alert('🦄 Detail has been updated Successfully!')
                    toast.success("Detail has been updated Successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    toast.error(json.message, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

            });
            toggleLoading(false);
        }
        else{
            toast.error("Enter All Details!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
    };
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(URL.createObjectURL(selectedImage));
        setRawImage(selectedImage)
        setIsEditImage(true);
        // You can add logic here to handle image upload to your server
    };
    const handleUploadImage = ()=>{
        setUploadLoad(true);
        const formData = new FormData();
        formData.append('userImg', rawImage);
        if(formData){
            uploadProfilePic(userId, formData).then((resp)=>{
                // console.log("saveUploads_lostAndFound",resp)
                if(resp.message=== "ok"){
                    localStorage.setItem(resp.imageUrl);
                    toast.success("Profile pic upload Successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setIsEditImage(false);
                    
                }
                else{
                    toast.error(resp.message, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setIsEditImage(false);

                }
                setUploadLoad(false);
            }).catch((err)=>{
                console.log("image upload err",err)
                setUploadLoad(false);
                setIsEditImage(false);
                // setSuccessMessage(err);
            })
        }
    }
  return (
    <>
        <Navbar />
        <ToastContainer/>
        <div className="m-5 flex flex-col justify-center items-center">
            <label htmlFor="avatar-upload" className="relative cursor-pointer">
                <Avatar
                variant="circular"
                size="xxl"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src={image || profilepic || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
                />
                <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                />
                <EditIcon
                className="absolute bottom-0 right-0 text-gray-500 hover:text-gray-700 bg-light-blue-50 rounded-full p-1 cursor-pointer"
                fontSize="medium"
                />
            </label>
            <p className="font-semibold mt-2">{userData?.userName}</p>
            {isEditImage && (
                <Button onClick={handleUploadImage} variant="outlined" size="sm" loading={uploadLoad}>
                    Upload
                </Button>
            )}
        </div>
        <form className=" bg-white shadow-lg rounded-lg my-15 mx-60 p-4 grid grid-cols-2 gap-6 mb-10">
            <div>
            <label htmlFor="firstName" className=" mb-1 ml-1 block font-bold text-gray-600 ">First Name
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="firstName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="firstName" placeholder={userData?.firstName} value={formData.firstName} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="lastName" className=" mb-1 ml-1 block font-bold text-gray-600 ">Last Name
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="text" id="lastName" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="lastName" placeholder={userData?.lastName} value={formData.lastName} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="email" className=" mb-1 ml-1 block font-bold text-gray-600 ">Email
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="email" id="email" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="email" placeholder={userData?.email} value={formData.email} disabled required />
            </div>

            <div>
            <label htmlFor="phoneNo" className=" mb-1 ml-1 block font-bold text-gray-600 ">Contact
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="number" id="phoneNo" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="phoneNo" placeholder={userData?.phoneNo}  value={formData.phoneNo} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="password" className=" mb-1 ml-1 block font-bold text-gray-600 ">Password
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="password" id="password" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="password" value={formData.password} onChange={handleFormChange} required />
            </div>

            <div>
            <label htmlFor="confirmpassword" className=" mb-1 ml-1 block font-bold text-gray-600 ">Confirm Password
                <span className="text-red-500">&nbsp;*</span>
            </label>
            <input type="confirmpassword" id="confirmpassword" className="w-full border rounded-md py-2 px-3 focus:outline-none  focus:border-red-200" name="confirmpassword" value={confirmPsw} onChange={(e)=>setConfirmPsw(e.target.value)} required />
            </div>


            <div className=" col-start-1 col-end-3 flex justify-center">
            <Button
                type="submit"
                onClick={formSubmit}
            >
                Submit
            </Button>
            </div>
        </form>
        <Footer/>

    </>
  )
}

export default EditProfile