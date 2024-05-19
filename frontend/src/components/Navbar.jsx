import React, {useState, useEffect} from "react";
import { getUserDetails } from "../controllers/backendRoutes";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import CottageIcon from '@mui/icons-material/Cottage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { useLocation } from "react-router-dom";

const base = process.env.REACT_APP_BASE;

export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    // Redirect to login route
    navigate("/login");
  };

  // Function to handle signup button click
  const handleSignupClick = () => {
    // Redirect to signup route
    navigate("/signup");
  };

  const logout = ()=>{
    localStorage.clear();
    console.log("logoutt")
    navigate("/");
  }
  const home=()=>{
    navigate("/");
  }
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: CottageIcon },
    { path: "/mainpage", label: "List Your Properties", icon: ApartmentIcon },
    { path: "/listed", label: "Your Listed Rooms", icon: NotListedLocationIcon },
  ];
  const currentPath = location.pathname;

  const isCurrentPage = (path) => {
    return currentPath === path;
  };
 
  const navList = (
    <ul className="mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      {navLinks.map(({ path, label, icon: Icon }, index) => (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className={`p-1 font-normal ${isCurrentPage(path) ? ' border-b-2 border-[#3b71ca]' : ''}`}
          >
            <a href={path} className={`flex items-center lg:font-bold text-xl ${isCurrentPage(path) ? ' text-[#3b71ca]' : 'text-gray-800 '} `}>
              <Icon className="mr-1" />
              {label}
            </a>
          </Typography>
        ))}
    </ul>
  );

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  function ProfileMenu() {
    const [profilepic, setProfilepic] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
    const closeMenu = () => setIsMenuOpen(false);
    const handleMenuItemClick = (label) => {
      if (label === "Sign Out") {
        logout();
      } else {
        // Redirect to respective pages based on menu item label
        switch (label) {
          case "My Profile":
            navigate("/myprofile");
            break;
          case "Edit Profile":
            navigate("/editprofile");
            break;
          case "Inbox":
            navigate("/inbox");
            break;
          case "Help":
            navigate("/help");
            break;
          default:
            break;
        }
      }
      closeMenu();
    };
    useEffect(()=>{
      const id= localStorage.getItem("userId");
      const imageUrl= localStorage.getItem("imageUrl");
      // setProfilepic(base+'/'+ imageUrl)
      getUserDetails(id).then((resp)=>{
        // console.log("myprofileroute",resp)
        if(resp.message==="ok"){
            if(resp.userData.imageUrl!=""){
                setProfilepic(base+'/'+ resp.userData.imageUrl)
            }
        }
      })
    },[])

  
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto outline-none"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={ profilepic || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
      </Menu>
    );
  }
 
  return (
    <div className=" max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2 " 
              style={{
                      background: "linear-gradient(90deg, rgba(172,231,255,1) 0%, rgba(255,250,232,1) 79%)",
                    }}>
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
          <div className="flex justify-center items-center">

            <img
                href="/"
                className="mx-auto w-28"
                src={require('../assets/images/logoimg.png')}
                alt="logo"
              />
          </div>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {localStorage.getItem('token') ? 
              <div>
                <ProfileMenu />
              </div> : (

              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleLoginClick}
                >
                  <span>Log In</span>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleSignupClick}
                >
                  <span>Sign Up</span>
                </Button>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" onClick={handleLoginClick}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" onClick={handleSignupClick}>
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}