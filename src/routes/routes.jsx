import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/search/Search";
import Notifications from "../pages/Notifications/Notifications";
import Chat from "../pages/Chat/Chat";
import Saved from "../pages/Saved/Saved";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import PrivateRoutes from "./PrivateRoutes";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path: '/',
            element: <PrivateRoutes>
              <Home></Home> 
            </PrivateRoutes>
        },
        {
            path: '/signIn',
            element: <SignIn></SignIn> 
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp> 
        },
        {
            path: '/search',
            element: <Search></Search>
        },
        {
            path: '/notifications',
            element: <PrivateRoutes>
              <Notifications></Notifications>
            </PrivateRoutes>
        },
        {
            path: '/chat',
            element: <PrivateRoutes>
              <Chat></Chat>
            </PrivateRoutes>
        },
        {
            path: '/saved',
            element: <PrivateRoutes>
              <Saved></Saved>
            </PrivateRoutes>
        },
        {
            path: '/profile',
            element: <PrivateRoutes>
              <Profile></Profile>
            </PrivateRoutes>
        },
        {
            path: '/settings',
            element: <Settings></Settings>
        },
      ]
    },
  ]);

export default router