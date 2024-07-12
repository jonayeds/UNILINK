import { Link } from "react-router-dom";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TbLogs } from "react-icons/tb";
import { AiFillPicture } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
const Profile = () => {
    const {auth} = useAuth()
    const user = auth.currentUser
    const [profile, setProfile] = useState({})
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get(`/users/email/${user?.email}`)
        .then((res)=>{
            setProfile(res.data)
        })
    }, [axiosSecure, user])
    console.log(profile.posts)
    if(!profile.fullName && user){
      return <div className="flex items-center justify-center w-full md:h-[100vh] min-h-[calc(100vh-80px)]  ">
      <div>
        <h1 className="text-xl md:text-4xl font-bold flex items-center text-white">L<svg stroke="currentColor" fill="currentColor" 
            viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
            </path>
          </svg> ading . . .</h1>
      </div>
    </div>
    }
    return (
        <div>
            {
                <div>
                    <div className="flex flex-col items-center  pt-12">
      <div className="flex gap-16 items-center md:flex-row flex-col w-full md:w-max">
      <div className="w-32 h-32 overflow-hidden rounded-full">
        <img src={profile.image} alt="" className="w-32 " />
        </div>
        <div className="w-full md:w-max mx-auto px-8 md:px-0">
          <div className="flex items-center md:flex-row flex-col  space-y-8 md:space-y-0 md:space-x-8">
            <p className="text-2xl font-semibold text-white">{profile.fullName}</p>
            <div>
              <Link to={`/profile/edit`} className=" px-4 py-1 rounded-lg text-gray-300 border font-semibold hover:text-white  duration-300">Edit Profile</Link>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col items-center">
                <p className="text-white">{profile.postsCount}</p>
                <p>posts</p>
            </div>
            <Link to={`/profile/followers/${profile._id}`} className="flex flex-col items-center">
                <p className="text-white">{profile.followers}</p>
                <p>followers</p>
            </Link>
            <Link to={`/profile/following/${profile._id}`} className="flex flex-col items-center">
                <p className="text-white">{profile.following}</p>
                <p>following</p>
            </Link>
          </div>
          <hr className="mt-6 border-gray-400" />
          <p className="mt-2">
            BIO
          </p>
          <p className=" mt-2 text-white">
            {
              profile.bio
            }
          </p>
        </div>
      </div>
      <div className="mt-20 w-full md:px-12 px-4">
      <Tabs id="controlled-tabs" className={'mx-auto  '} selectedTabClassName="selected-tab duration-500  border-0">
    <TabList className={' flex justify-center '}>
      <Tab ><AiFillPicture className="text-5xl bg-black  " /></Tab>
      <Tab  ><TbLogs  className="text-5xl bg-black  " /></Tab>
    </TabList>

    <TabPanel>
      <hr className="border-gray-600 border   " />
    <div className="grid grid-cols-3 gap-2 mt-4 lg:w-[750px] md:w-[600px] w-[90vw] mx-auto "> 
        {
          profile.posts.map(post=> !post.uploadImg ? <div key={post.postId} className="hidden"></div>  : <Link to={`/post/${profile.email}/${post.postId}`} key={post.postId} className=" lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[30vw] h-[30vw] overflow-hidden  rounded-md border-gray-500 border-2  flex justify-center items-center">
            <img src={post.uploadImg} alt="" className=" w-full" />
          </Link>)
        }
      </div>
    </TabPanel>
    <TabPanel>
    <hr className="border-gray-600 border   " />
    <div className=" text-center mt-24 space-y-8 mx-auto mb-6"> 
        {
          profile.posts.map(post=> post.uploadImg ? <div key={post.postId}></div> : <div key={post.postId} className="  gap-8 border-gray-600 border py-4 px-8 rounded-btn   max-w-max mx-auto">
           <div className="  flex items-center  gap-4 ">
           <img src={profile.image} className="w-16 h-16   border rounded-full"  alt="" />
              <p className="text-white text-xl font-semibold">{profile.fullName}</p>
           </div>
            <div className="text-left mt-6">
           <Link to={`/post/${profile.email}/${post.postId}`}> <p className="">{post.caption}</p></Link>
            </div>
            <div className="flex justify-around border-t  border-t-gray-600 mt-4 pt-4 ">
            <CiHeart className="w-full border-r border-gray-600 text-2xl text-white "  />
            <GoComment className="w-full text-white text-xl" />
            </div>
          </div>)
        }
      </div>
    </TabPanel>
  </Tabs>
      
      </div>
    </div>
                </div>
            }
        </div>
    );
};

export default Profile;
