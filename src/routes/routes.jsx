import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/search/Search";
import Notifications from "../pages/Notifications/Notifications";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path: '/',
            element: <Home></Home> 
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
            element: <Notifications></Notifications>
        },
      ]
    },
  ]);

export default router