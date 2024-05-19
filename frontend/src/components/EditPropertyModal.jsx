// components/EditPropertyModal.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { updateRoom, updateRoomWithImage } from '../controllers/backendRoutes';

const base = process.env.REACT_APP_BASE;

const EditPropertyModal = ({ open, onClose, property, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    price: property.price,
    place: property.place,
    area: property.area,
    bathrooms: property.bathrooms,
    bedrooms: property.bedrooms,
    nearby_hospitals: property.nearby_hospitals,
    nearby_colleges: property.nearby_colleges,
    images: property.images
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  }, [selectedFile]);

  useEffect(()=>{
    setFormData(property)
    setImagePreview(base + '/' + property.images);
  },[property])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const data = new FormData();
      data.append('images', selectedFile);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("place", formData.place);
      data.append("area", formData.area);
      data.append("bathrooms", formData.bathrooms);
      data.append("bedrooms", formData.bedrooms);
      data.append("nearby_hospitals", formData.nearby_hospitals);
      data.append("nearby_colleges", formData.nearby_colleges);

      const response = await updateRoomWithImage(property._id, data);
      if (response.message === "ok") {
        onUpdate(response.data);
        onClose();
        setSelectedFile(null);
      } else {
        console.log(response.message);
      }
    } else {
      const response = await updateRoom(property._id, formData);
      if (response.message === "ok") {
        onUpdate(response.data);
        onClose();
      } else {
        console.log(response.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} className=" overflow-auto">
      <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>Edit Property</Typography>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nearby Hospitals"
            name="nearby_hospitals"
            value={formData.nearby_hospitals}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nearby Colleges"
            name="nearby_colleges"
            value={formData.nearby_colleges}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box {...getRootProps()} sx={{ border: '1px dashed grey', p: 2, mt: 2 }} className="cursor-pointer">
            <input {...getInputProps()} />
            {imagePreview ? (
                <>
                    <p className="text-xs">Drag n drop an image here, or click to select one</p>
                    <img src={imagePreview} alt={imagePreview}  style={{ width: '100%', height: 'auto' }} />
                </>
            ) : (
              <Typography>Drag 'n' drop an image here, or click to select one</Typography>
            )}
          </Box>
          <div className=" col-span-2 flex justify-center mt-4">
            <Button type="submit" variant="contained" color="primary" style={{
                    background:
                      "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                    color: "black"
                  }}>Save Changes</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditPropertyModal;
