import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProperties } from '../controllers/backendRoutes';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Modal,
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Autocomplete,
  Pagination
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import PlaceIcon from '@mui/icons-material/Place';
import SignpostIcon from '@mui/icons-material/Signpost';
import HotTubIcon from '@mui/icons-material/HotTub';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { sendEmails} from '../controllers/backendRoutes';

const base = process.env.REACT_APP_BASE;
const recommendedLocations = ["Bhopal", "Jabalpur", "Indore", "Delhi", "Pune"];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listedData, setListedData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    price: "",
    bathrooms: "",
    bedrooms: "",
    nearby_hospitals: "",
    nearby_colleges: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDetailClick, setIsViewDetailClick] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Filter data based on search term and filter options
    const filtered = listedData.filter(property => {
      return property.place.toLowerCase().includes(searchTerm? searchTerm.toLowerCase(): "");
    });
    setFilteredData(filtered);
  };

  const applyFilter = () => {
      const filtered = listedData.filter(property => {
        return (
          property.place.toLowerCase().includes(searchTerm? searchTerm.toLowerCase(): "") ||
          (!filterOptions.price || property.price <= parseInt(filterOptions.price)) &&
          (!filterOptions.bathrooms || property.bathrooms == parseInt(filterOptions.bathrooms)) &&
          (!filterOptions.bedrooms || property.bedrooms == parseInt(filterOptions.bedrooms)) &&
          (!filterOptions.nearby_hospitals || property.nearby_hospitals >= parseInt(filterOptions.nearby_hospitals)) &&
          (!filterOptions.nearby_colleges || property.nearby_colleges >= parseInt(filterOptions.nearby_colleges))
        );
      });
      setFilteredData(filtered);
      toggleModal();
    };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalViewDetail = () => {
    setIsViewDetailClick(!isViewDetailClick);
  };



  useEffect(() => {
    getProperties().then((resp) => {
      if (resp.message === "ok") {
        console.log("getListedRooms data", resp.data);
        setListedData(resp.data);
        setRecommendedProperties(resp.data.slice(0, 5));
      } else {
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
    });
  }, []);


  const interested = ()=>{
    const id = localStorage.getItem("token");
    if(id){
      const userId = localStorage.getItem("userId");
      toast.info("Sending you the email",  {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      sendEmails(userId,selectedProperty).then((resp)=>{
        if(resp.message === "ok"){
          toast.success("Seller's Contact Details Share to you mail id", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
        }
        else{
          toast.error("Sorry, Failed to sent mail you!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
        }
      })
    }
    else{
      toast.error("Please Login before getting seller's Details", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });

    }
    
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedProperties = recommendedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Container className="m-8 p-2">
        <Typography variant="h4" gutterBottom>
         <TravelExploreIcon className="mr-1 w-20" fontSize='large'/>
          Search Rooms
        </Typography>
        <br />
        <div className="mb-2">
          <div className="flex mb-4">
            <Autocomplete
              fullWidth
              options={recommendedLocations}
              value={searchTerm}
              onChange={(event, newValue) => {
                setSearchTerm(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  variant="outlined"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            />
            <IconButton onClick={toggleModal} color="primary">
              <FilterListIcon />
            </IconButton>
          </div>
          <div  className="flex justify-center my-8">
            <Button variant="contained" color="primary" onClick={handleSearch} style={{
                      background: "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                      color: "#000000"
                    }}>
              Search
            </Button>
          </div>
        </div>


        {/* Filter Modal */}
        <Modal open={isModalOpen} onClose={toggleModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Filter Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={'number'}
                  min={100}
                  label="Price"
                  variant="outlined"
                  name="price"
                  value={filterOptions.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={'number'}
                  label="Bathrooms"
                  variant="outlined"
                  name="bathrooms"
                  value={filterOptions.bathrooms}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={'number'}
                  label="Bedrooms"
                  variant="outlined"
                  name="bedrooms"
                  value={filterOptions.bedrooms}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={'number'}
                  label="Nearby Colleges"
                  variant="outlined"
                  name="nearby_colleges"
                  value={filterOptions.nearby_colleges}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type={'number'}
                  label="Nearby Hospitals"
                  variant="outlined"
                  name="nearby_hospitals"
                  value={filterOptions.nearby_hospitals}
                  onChange={handleChange}
                />
              </Grid>
              {/* Add other filter fields here */}
            </Grid>
            <div className="mt-2 flex justify-center">
              <Button variant="contained" color="primary" onClick={applyFilter}>
                Apply Filters
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Display filtered data in cards */}
        <Grid container spacing={3}>
          {filteredData.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card>
                <CardMedia
                component="img"
                height="140"
                image={base+'/'+ property.images}
                alt={property.title}
              />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.description}
                  </Typography>
                  <div className="mt-4" >
                    <Button variant="contained" color="primary" onClick={()=>{setSelectedProperty(property)
        toggleModalViewDetail()} }>
                      View Details
                    </Button>

                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Recommendations */}
        <div className=" mt-28">
          <h1 className="font-bold text-2xl text-gray-600">
          Recommended | Rooms for Rent Near Me
        </h1>
        <br />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paginatedProperties.map(property => (
            <div key={property._id} className="flex">
              <img
                className=" w-80"
                src={base + '/' + property.images}
                alt={property.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
                <div className="mt-4">
                  <Button variant="contained" color="primary" onClick={() => { setSelectedProperty(property); toggleModalViewDetail(); }}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </div>
          ))}
        </Box>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(recommendedProperties.length / propertiesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />


        </div>

        <Modal open={isViewDetailClick} onClose={toggleModalViewDetail}>
        <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
          <Card>
              <CardMedia
                component="img"
                height="14"
                width={14}
                image={base+'/'+ selectedProperty?.images}
                alt={selectedProperty?.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {selectedProperty?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProperty?.description}
                </Typography>

                <h1 className="font-bold text-end my-2">Price :  ₹ {selectedProperty?.price} /month</h1>
                <div className="grid grid-cols-2 gap-y-2 mb-4">
                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <PlaceIcon className="mr-1" />
                      Place <strong className="ml-4 text-black font-medium">{selectedProperty?.place}</strong>
                    </div>
                
                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <SignpostIcon className="mr-1" />
                      Area <strong className="ml-4 text-black font-medium">{selectedProperty?.area}</strong>
                    </div>

                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <HotTubIcon className="mr-1" />
                      Bathrooms <strong className="ml-4 text-black font-medium">{selectedProperty?.bathrooms}</strong>
                    </div>

                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <BedroomParentIcon className="mr-1" />
                      Bedrooms <strong className="ml-4 text-black font-medium">{selectedProperty?.bedrooms}</strong>
                    </div>

                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <LocalHospitalIcon className="mr-1" />
                      Nearby Hospitals <strong className="ml-4 text-black font-medium">{selectedProperty?.nearby_hospitals}</strong>
                    </div>


                    <div className={`flex items-center lg:font-bold text-xl text-[#3b71ca] `}>
                      <SchoolIcon className="mr-1" />
                      Nearby Colleges<strong className="ml-4 text-black font-medium">{selectedProperty?.nearby_colleges}</strong>
                    </div>

                </div>
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-md font-bold leading-normal text-gray-600 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                  }}
                  onClick={interested}
                >
                  I'm Interested
                </button>


              </CardContent>
          </Card>

          </Box>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
