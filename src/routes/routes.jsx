import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


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
      ]
    },
  ]);

export default router