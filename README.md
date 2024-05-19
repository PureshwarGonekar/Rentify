# Rentify | [live](https://rentify-two.vercel.app/)
Rentify is a web application designed to connect property seekers with sellers, specifically focusing on PGs (paying guest accommodations), rooms, and other properties. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Rentify offers a seamless experience for users to search for properties, list their own, and manage their profiles. The application includes robust authentication, property listing, and management features, alongside an efficient email notification system.

## Screenshots

## Features

### User Authentication
- **Sign In:** Allows users to log in using email and password.
- **Register:** New users can register by providing their first name, last name, email, phone number, and password. Passwords are hashed using `bcryptjs`.

### Home Page
- **Search and Filters:** Users can search for properties by location and apply filters such as price, number of bedrooms, bathrooms, nearby hospitals, and colleges.
- **Recommendations and Pagination:** Displays recommended and nearby properties with pagination for efficient data handling.
- **Property Details:** Users can view full details of a property and express interest by clicking "I'm interested", triggering automated email notifications.

### List Your Property Page
- **Property Listing:** Sellers can list properties by providing details like title, description, price, number of bedrooms, bathrooms, nearby amenities, and upload images using drag-and-drop functionality.

### Your Listed Properties Page
- **Property Management:** Sellers can view, edit, and delete their listed properties. This page is accessible only to signed-in users.

### My Profile Page
- **Profile Viewing and Editing:** Users can view their profile details and edit their profile picture, personal information, and password.

## Technology Stack

### Frontend
- **React.js:** For a dynamic and responsive user interface.
- **Tailwind CSS and Material UI:** For styling and ensuring responsiveness.

### Backend
- **Node.js and Express.js:** For server-side operations and routing.
- **MongoDB:** For storing user and property data.

### Authentication and Security
- **bcryptjs:** For hashing user passwords.
- **JWT (JSON Web Tokens):** For secure user authentication and session management.

### File Handling
- **Multer:** For managing file uploads (profile pictures and property images).

### Email Notifications
- **Nodemailer:** For sending automated emails when users express interest in properties.


### Usage
- **Register and Sign In:** Users can register and sign in to the application.
- **Search for Properties (Rooms):** Use the search bar and filters on the home page to find properties.
- **List Properties:** Sellers can list new properties and manage existing ones.
- **Express Interest:** Property seekers can express interest in properties, triggering email notifications to both parties.
Manage Profile: Users can view and edit their profile details.