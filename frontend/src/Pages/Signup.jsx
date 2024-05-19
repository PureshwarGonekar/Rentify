import React, { useState,useContext } from "react";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { createUser } from '../controllers/backendRoutes';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const base = process.env.REACT_APP_BASE;
export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
  });

  const [showError, setShowError]=useState('');

  const [confirmPsw, setConfirmPsw] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleChangeConfirmPsw = (e)=>{
    setConfirmPsw(e.target.value);
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData",formData)
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
    if(formData.password && formData.firstName && formData.lastName && formData.email && formData.phoneNo){

      createUser(formData).then((json)=>{

        console.log("json",json)
        
        if (json.success === true) {
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("userId", json.userId);
          localStorage.setItem("firstName", json.firstName);
          localStorage.setItem("lastName", json.lastName);
          localStorage.setItem("email", json.email);
          localStorage.setItem("phoneNo", json.phoneNo);
          localStorage.setItem("imageUrl", json.imageUrl);
          // toast.success('🦄 Account Created Successfully!', {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   theme: "colored",
          // });
          alert('🦄 Account Created Successfully!')
          navigate("/");
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

    }
    else{
       toast.error("Enter all the details !!", {
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

  };

  return (
    <>
      <ToastContainer/>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700 flex justify-center mt-10">
        <div className="container h-full p-8">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left column container*/}
                  <div
                    className="flex  rounded-b-lg lg:w-6/12 lg:rounded-l-lg lg:rounded-br-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                    }}
                  >
                    <div className="px-4 py-6 md:mx-6 md:p-12 text-black">
                      <a href="/">
                        <img
                          className="mx-auto w-60"
                          src={require('../assets/images/rentifyLogo.png')}
                          alt="logo"
                        />
                      </a>
                      <h4 className="mb-4 text-xl font-semibold text-center">
                        Find Your Perfect Room, Right Around the Corner
                      </h4>
                      <p className="text-sm text-center">
                        Rentify is your go-to platform for finding rooms available for rent in your local area. Whether you're looking for a cozy room in a bustling neighborhood or a peaceful retreat close to work or school, Rentify simplifies your search. 
                      </p>
                    </div>
                  </div>

                  {/* Right column container with background and description*/}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:px-12">
                      {/* Logo */}
                      <div className="text-center">
                
                        <h4 className="mt-4 mb-2 pb-1 text-xl font-semibold">
                          Register yourself
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-end gap-6 mb-4">
                          <Input
                            type="text"
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mb-4"
                          />
                          <Input
                            type="text"
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mb-4"
                          />
                          <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mb-4"
                          />
                          <Input
                            type="text"
                            label="Phone Number"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            className="mb-4"
                          />
                          <Input
                            type="password"
                            label="Password"
                            name="password"
                            // value={formData.password}
                            onChange={handleChange}
                            className="mb-4"
                          />
                          <Input
                            type="password"
                            label="Confirm Password"
                            name="confirmPsw"
                            // value={confirmPsw}
                            onChange={handleChangeConfirmPsw}
                            className="mb-4"
                          />
                        </div>

                        {/* Submit button */}
                        <div className="mb-2 pb-1 pt-1 text-center underline text-blue-500">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                            }}
                          >
                            Sign up
                          </button>


                          <a href="#!">Terms and conditions</a>
                        </div>
                          {/* {showError && 
                            <p className=" text-red-700 py-2" >* {showError}</p>
                          } */}

                        {/* Register button */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Have an account?</p>
                          <button
                            onClick={handleLoginClick}
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
