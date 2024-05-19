import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getUserDetails } from '../controllers/backendRoutes';
import { MainContext } from "../App";
import {  Avatar} from "@material-tailwind/react";

const base = process.env.REACT_APP_BASE;

const MyProfile = () => {
    const navigate = useNavigate();

    const [userData, setUserData]= useState();
    const {  toggleLoading, } = useContext(MainContext);
    const [profilepic, setProfilepic] = useState(null);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      const id= localStorage.getItem("userId");
      if (!token) {
        navigate("/login");
      } 
      toggleLoading(true)
      getUserDetails(id).then((resp)=>{
        // console.log("myprofileroute",resp)
        if(resp.message==="ok"){
            setUserData(resp.userData);
            if(resp.userData.imageUrl!=""){
                setProfilepic(base+'/'+ resp.userData.imageUrl)
            }
        }
      })
      toggleLoading(false);

    },[]);
  return (
    <>
        <Navbar />
        <div className="m-5 flex flex-col justify-center items-center">
            <Avatar
              variant="circular"
              size="xxl"
              className="border border-gray-900 p-0.5"
              src={profilepic || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" }
            />
            <p className=" font-semibold mt-2">{userData?.userName}</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg my-15 lg:mx-96 md:mx-40 sm:mx-20 p-8 grid grid-cols-3 gap-y-6  mb-10'>

            
                <label htmlFor="name" className=" block font-bold text-gray-600 ">First Name
                </label>
                <span>:</span>
                <span className=" ml-2">{userData?.firstName}</span>    

                <label htmlFor="name" className=" block font-bold text-gray-600 ">Last Name
                </label>
                <span>:</span>
                <span className=" ml-2">{userData?.lastName}</span>                  


            
                <label htmlFor="id" className=" block font-bold text-gray-600 ">Email
                </label>
                <span>:</span>
                <span className=" ml-2 text-ellipsis overflow-hidden">{userData?.email}</span>                

            
                <label htmlFor="contact" className=" block font-bold text-gray-600 ">Contact
                </label>
                <span>:</span>
                <span className=" ml-2">{userData?.phoneNo}</span>
                    
        </div> 
        <Footer/>

    </>
  )
}

export default MyProfile