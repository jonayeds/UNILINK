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
import EditProfile from "../pages/Profile/EditProfile";
import FollowingList from "../pages/Profile/FollowingList";
import FollowersList from "../pages/Profile/FollowersList";
import PostDetails from "../pages/PostDetails/PostDetails";
import ChatList from "../pages/Chat/ChatList";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path: '/',
            element: <PrivateRoutes>
              <Home></Home> 
            </PrivateRoutes>,
            loader: ()=> fetch('https://unilink-server-lilac.vercel.app/users')
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
            path: '/post/:email/:id',
            element: <PostDetails></PostDetails>,
            loader: ({params})=>fetch(`https://unilink-server-lilac.vercel.app/users/email/${params.email}`)
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
              <ChatList></ChatList>
            </PrivateRoutes>
        },
        {
            path: '/chat/:chatId',
            element: <Chat></Chat>,
            loader:  ({params})=>fetch(`http://localhost:5000/chats/${params.chatId}`)

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
            path: '/profile/following/:id',
            element: <FollowingList></FollowingList>,
            loader: ({params})=> fetch(`https://unilink-server-lilac.vercel.app/users/id/${params.id}`)
        },
        {
            path: '/profile/followers/:id',
            element: <FollowersList></FollowersList>,
            loader: ({params})=> fetch(`https://unilink-server-lilac.vercel.app/users/id/${params.id}`)
        },
        {
            path: '/settings',
            element: <Settings></Settings>
        },
        {
            path: '/upload',
            element: <PrivateRoutes>
              <Upload></Upload>
            </PrivateRoutes>
        },
        {
            path: '/search/:id',
            element: <UsersProfile></UsersProfile>,
            loader: ({params})=> fetch(`https://unilink-server-lilac.vercel.app/users/id/${params.id}`)
        },
        {
            path: '/profile/edit',
            element: <EditProfile></EditProfile>,
        },
      ]
    },
  ]);

export default router