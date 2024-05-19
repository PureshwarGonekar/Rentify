import React, {useState, useEffect,createContext} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import MainPage from "./Pages/MainPage.jsx";
import MyProfile from "./Pages/MyProfile.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import CircularProgress from '@mui/material/CircularProgress';

import Listed from "./Pages/Listed.jsx";

export const MainContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = (value) => {
    setIsLoading(value);
  };
  const [userprofilepic, setUserprofilepic]=useState(null)
  // Get user data upon component mount
  const [userData, setUserData] = useState({
      userId:'',
      userName:'',
      fullName: '',
      email: '',
      password: '',
      contact: '',
      DOB: '',
      address: '',
    });
  return (
    <MainContext.Provider value={{ isLoading, toggleLoading, userData, setUserData, userprofilepic,setUserprofilepic }}>

      <div className={`main-app ${
          isLoading ? 'opacity-50 ' : '' }`}>
        <Router>
          <Routes>
            <Route exact path="/mainpage" element={<MainPage />} />
            <Route exact path="/listed" element={<Listed />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myprofile" element={<MyProfile />} />
            <Route exact path="/editprofile" element={<EditProfile />} />
          </Routes>
        </Router>
      </div>
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress /> 
        </div>
      )}
    </MainContext.Provider>
  );
}

export default App;
