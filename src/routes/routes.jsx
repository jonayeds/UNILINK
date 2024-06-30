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
import Upload from "../pages/Upload/Upload";
import UsersProfile from "../pages/Profile/UsersProfile";


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
        {
            path: '/upload',
            element: <Upload></Upload>
        },
        {
            path: '/search/:id',
            element: <UsersProfile></UsersProfile>,
            loader: ({params})=> fetch(`http://localhost:5000/users/id/${params.id}`)
        },
        {
            path: '/profile/:email',
            element: <UsersProfile></UsersProfile>,
        },
      ]
    },
  ]);

export default router