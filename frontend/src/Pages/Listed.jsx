import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getListedRooms, deleteRoom } from '../controllers/backendRoutes';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropertyCard from "../components/PropertyCard";
import EditPropertyModal from "../components/EditPropertyModal";
import {
  Container,
  Grid
} from '@mui/material';

const Listed = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const [listedData, setListedData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (token) {
      setIsAuth(true);
      setUserId(id);

      getListedRooms(id).then((resp) => {
        if (resp.message === "ok") {
          setListedData(resp.data);
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
    } else {
      setIsAuth(false);
      navigate("/login");
    }
  }, [navigate]);

  const handleEdit = (property) => {
    setCurrentProperty(property);
    setEditModalOpen(true);
  };

  const handleUpdate = (updatedProperty) => {
    setListedData((prevData) =>
      prevData.map((property) =>
        property._id === updatedProperty._id ? updatedProperty : property
      )
    );
    toast.success("Property updated successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelete = (propertyId) => {
    deleteRoom(propertyId).then((resp) => {
      if (resp.message === "ok") {
        setListedData((prevData) => prevData.filter(property => property._id !== propertyId));
        toast.success("Property deleted successfully", {
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
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container className="m-10">
        <Grid container spacing={2}>
          {listedData.length > 0 && listedData.map((property) => (
            <PropertyCard 
              key={property._id} 
              property={property} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </Grid>
      </Container>
      {currentProperty && (
        <EditPropertyModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          property={currentProperty}
          onUpdate={handleUpdate}
        />
      )}
      <Footer />
    </>
  );
};

export default Listed;
