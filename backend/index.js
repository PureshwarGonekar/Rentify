const connectToMongo = require("./db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const PORT = process.env.PORT || 5000;

connectToMongo();

const app = express();

const ORIGINSITE = process.env.ORIGINSITE || '*';
const corsOptions ={
   origin:ORIGINSITE
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/profilePic', express.static('profilePic'))
app.use('/uploads', express.static('uploads'))

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/",(req,res)=>{
  res.send("This is Rentify - a PG, rooms/property listing website developed by Pureshwar");
})


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `Rentify Backend is running at Port - http://localhost:${PORT}`
  );
});
