import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Button,
  CardActions
} from "@mui/material";

const base = process.env.REACT_APP_BASE;

const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={base+'/'+ property.images} // Assuming your backend serves images at this URL
            alt={property.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {property.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-4">
              <strong>Price: Rs. </strong> {property.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               <strong>Location: </strong>{property.place}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Area: </strong> {property.area}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="flex justify-end">
          <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(property)}>
            Edit
          </Button>
          <Button size="small" variant="outlined" color="secondary" onClick={() => onDelete(property._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PropertyCard;
