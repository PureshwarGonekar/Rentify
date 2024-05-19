# Rentify | [live](https://rentify-two.vercel.app/)
Rentify is a web application designed to connect property seekers with sellers, specifically focusing on PGs (paying guest accommodations), rooms, and other properties. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Rentify offers a seamless experience for users to search for properties, list their own, and manage their profiles. The application includes robust authentication, property listing, and management features, alongside an efficient email notification system.

## Screenshots
![Screenshot 2024-05-18 172721](https://github.com/PureshwarGonekar/Rentify/assets/88015818/e6011436-3499-49fa-a880-0a7f584b2c1a)
![Screenshot (345)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/f1647fe3-2adc-4294-a652-1717b58330d6)
![Screenshot (346)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/9124a1fe-ed4b-433c-a88d-bcd29eade837)
![Screenshot (347)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/19733e7d-b6db-457d-9d4f-adf6eaf94d9d)
![Screenshot (348)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/a1eafef8-6daf-4233-8a35-fd06949a09b2)
![Screenshot (349)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/b575381f-d31b-43ab-af42-67935005d2ff)
![Screenshot (350)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/ce400b55-b499-48d0-ac8d-c282772475bb)
![Screenshot (351)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/5ca3beee-7e6a-4837-b600-6492b9e7e569)
![Screenshot (352)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/f74e8c7d-f142-44bd-a343-d63b1e4dd320)
![Screenshot (353)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/4a5602b3-5629-4cd7-894f-5d6d4dcc6a78)
![Screenshot (354)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/edc23c0c-7a20-4fe1-b7df-d36d65d62f45)
![Screenshot (355)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/f568bf4d-c2d8-42cb-ac42-9180936bd636)
![Screenshot (356)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/e78e6fab-f885-41cb-ac2c-40ec1dbffef3)
![Screenshot (357)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/7e5d40d8-923b-4df7-8e46-2f09f9c6fda1)
![Screenshot (358)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/f8f4f68a-c2c5-4b3c-a056-3483b0067c36)
![Screenshot (359)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/9774014e-2b7f-4d0d-802b-d5bbecc0adc8)
![Screenshot (360)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/de5d75bc-56cf-4f1e-84ce-935aa2d5f38c)
![Screenshot (361)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/b076060a-c401-4944-b7fd-6fcc374e6cf8)
![Screenshot (362)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/4502fa2f-1576-41b2-a648-83316972ed2b)
![Screenshot (363)](https://github.com/PureshwarGonekar/Rentify/assets/88015818/a5971b2b-2cbd-40cc-94fd-bc8216b206d5)


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
