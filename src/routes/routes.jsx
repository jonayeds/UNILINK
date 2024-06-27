import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";


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
        }
      ]
    },
  ]);

export default router