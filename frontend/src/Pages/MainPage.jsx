import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Autocomplete from '@mui/material/Autocomplete';
import { saveProperty} from '../controllers/backendRoutes';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { useDropzone } from 'react-dropzone';



import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();
    const [wishList, setWishList] = useState([]);

  // Check if user is authenticated
    useEffect(() => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('userId');
      if (token) {
        setIsAuth(true);
        setUserId(id);
        // console.log("if token")
      } else {
        setIsAuth(false);
        console.log("Can't access login first");
        navigate("/login");
      }
    },[]);



    const [formData, setFormData] = useState({
      title: '',
      description: '',
      price: '',
      place: '',
      area: '',
      bathrooms: '',
      bedrooms: '',
      nearby_hospitals: '',
      nearby_colleges: '',
      images: []
    });

    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFormData(prevState => ({
          ...prevState,
          images: [...prevState.images, ...acceptedFiles]
        }));
      }
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      // Create FormData object
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("area", formData.area);
      formDataToSend.append("bathrooms", formData.bathrooms);
      formDataToSend.append("bedrooms", formData.bedrooms);
      formDataToSend.append("nearby_hospitals", formData.nearby_hospitals);
      formDataToSend.append("nearby_colleges", formData.nearby_colleges);
      formDataToSend.append("images", formData.images[0]);

      saveProperty(userId, formDataToSend)
        .then((resp) => {
          console.log("in resp", resp);
          if(resp.message === "ok"){
             toast.success("Your Property listed into our website!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setFormData({
              title: '',
              description: '',
              price: '',
              place: '',
              area: '',
              bathrooms: '',
              bedrooms: '',
              nearby_hospitals: '',
              nearby_colleges: '',
              images: []
            })
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
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log(formData);
    };


  return (
    <>
      <Navbar />
      <ToastContainer/>

      <Container maxWidth="md" className="mt-8">
        <h1 className="text-2xl text-gray-700 font-bold flex items-center my-8">
          <FeaturedPlayListIcon />
            <strong className="ml-2">List Your Property</strong>
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: 'Title', name: 'title' },
              { label: 'Description', name: 'description', multiline: true, rows: 4 },
              { label: 'Price', name: 'price', type: 'number' },
              { label: 'Place', name: 'place' },
              { label: 'Area', name: 'area' },
              { label: 'Bathrooms', name: 'bathrooms', type: 'number' },
              { label: 'Bedrooms', name: 'bedrooms', type: 'number' },
              { label: 'Nearby Hospitals', name: 'nearby_hospitals', type: 'number' },
              { label: 'Nearby Colleges', name: 'nearby_colleges', type: 'number' },
            ].map((field, index) => (
              <Grid item xs={12} sm={field.multiline ? 12 : 6} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  multiline={field.multiline || false}
                  rows={field.rows || 1}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-4 text-center">
                <input {...getInputProps()} />
                <Typography>Drag & drop some files here, or click to select files</Typography>
              </div>
              <Box className="mt-4">
                {formData.images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    className="inline-block m-2 h-32 w-32 object-cover"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Footer/>

    </>
  )
}

export default MainPage;
