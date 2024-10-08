import {  useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useAuth from "../../custom hooks/useAuth";
import Swal from "sweetalert2";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TbLogs } from "react-icons/tb";
import { RiGridFill } from "react-icons/ri";
import { BsHeartFill } from "react-icons/bs";
import RevealText from "../../sharedComponents/RevealText";
import FunctionalStatus from "../../sharedComponents/FunctionalStatus";
const UsersProfile = () => {
  const profile = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const {auth} = useAuth()
  const followerAccounts = profile.followerAccounts
  const [isFollowing, setIsFollowing] = useState([])
  const [followersCount, setFollowersCount] = useState(profile.followers)
  useEffect(()=>{
    setIsFollowing(profile.followerAccounts.filter(follower=> follower === auth?.currentUser?.email))
  },[ auth?.currentUser?.email])
  const handleFollow = ()=>{
    if(!auth.currentUser){
      navigate('/signIn')
      return
    }
    console.log('hitted')
    setFollowersCount(followersCount +1 )
    setIsFollowing([auth?.currentUser?.email])
    axiosSecure.put(`/users/${profile.email}`, {
      followers: followersCount + 1,
      followerAccounts: [...followerAccounts, auth?.currentUser?.email]
    })
    .then(()=>{
      // console.log(res.data)
      axiosSecure.get(`/users/email/${auth?.currentUser?.email}`)
    .then(p=>{
      // console.log(p.data)
      const currentP = p.data
      axiosSecure.put(`/users/${auth?.currentUser?.email}`, {
        followingAccounts: [...currentP.followingAccounts, profile.email], 
        following : parseInt(currentP.following) + 1
      })
      .then(r=>{
        console.log(r.data)
      })
    })
    })
  }
console.log("followers",followersCount)
  const handleUnfollow = () =>{
    Swal.fire({
      title: 'Unfollow',
      text: 'Unfollow this account?',
      icon: 'question',
      color:'black',
      confirmButtonText: 'Yes',
      cancelButtonText: 'cancel',
      showCancelButton: true,
      confirmButtonColor: 'black',
    })
    .then((result)=>{
      if(result.isConfirmed){
        setFollowersCount(followersCount - 1)
        setIsFollowing([])
        
        axiosSecure.put(`/users/${profile.email}`, {
          followers: parseInt(followersCount) - 1,
          followerAccounts: followerAccounts.filter((follower)=>follower !== auth?.currentUser?.email )
        })
        .then(res=>{
          console.log(res.data)
          axiosSecure.get(`/users/email/${auth?.currentUser?.email}`)
    .then(p=>{
      console.log(p.data)
      const currentP = p.data
      axiosSecure.put(`/users/${auth?.currentUser?.email}`, {
        following: parseInt(currentP.following) - 1,
        followingAccounts: currentP.followingAccounts.filter((follower)=>follower !== profile.email )
      })
      .then(data=>{
        console.log(data.data)
      })
    })
        })
      }
    })
  }
  console.log(profile.posts)
  return (
    <div className="flex flex-col items-center justify-center  pt-12">
      <div className="flex gap-16 items-center md:flex-row flex-col w-full md:w-max">
        <div className="w-32 h-32 overflow-hidden rounded-full">
        <img src={profile.image} alt="" className="w-32 " />
        </div>
        <div className="w-full md:w-max mx-auto px-8 md:px-0">
          <div className="flex items-center md:flex-row flex-col  space-y-8 md:space-y-0 md:space-x-8">
          <RevealText text={profile.fullName}/>
            <div>
              {
                isFollowing.length ? <button onClick={handleUnfollow} className="bg-black  px-4 py-1 rounded-md text-gray-200 border font-semibold hover:text-white duration-300">Following</button> : <button onClick={handleFollow} className="bg-[#aebeff] px-4 py-1 rounded-md text-black font-semibold hover:bg-[#c3cdf7] duration-300">Follow</button>
              }
            
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col items-center">
                <p className="text-white">{profile.postsCount}</p>
                <p>posts</p>
            </div>
            <Link to={`/profile/followers/${profile._id}`} className="flex flex-col items-center">
                <p className="text-white">{followersCount}</p>
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
      <Tab ><RiGridFill className="text-4xl bg-black  " /></Tab>
      <Tab  ><TbLogs  className="text-4xl bg-black  " /></Tab>
    </TabList>

    <TabPanel>
      <hr className="border-gray-600 border   " />
    <div className="grid grid-cols-3 gap-2 mt-4 lg:w-[750px] md:w-[600px] w-[90vw] mx-auto "> 
        {
          profile.posts.map(post=> !post.uploadImg ? <div key={profile._id} className="hidden"></div>  : <Link to={`/post/${profile.email}/${post.postId}`} key={profile._id} className=" lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[30vw] h-[30vw] overflow-hidden  rounded-md border-gray-500 border-2  flex justify-center items-center group relative">
            <img src={post.uploadImg} alt="" className=" w-full group-hover:scale-105 duration-500" />
            <p className="absolute   h-full w-full group-hover:flex justify-center items-center bg-black  bg-opacity-25 text-white font-semibold  hidden ease-in duration-500 " ><div className="flex items-end">
            <p className=" leading-none text-lg">
            {post.likes}</p><BsHeartFill className="ml-1 text-red-500"/>
              </div></p>
          </Link>)
        }
      </div>
    </TabPanel>
    <TabPanel>
    <hr className="border-gray-600 border   " />
    <div className=" text-center mt-24 space-y-8 mx-auto mb-6"> 
        {
          profile.posts.map(post=> post.uploadImg ? <div key={profile._id}></div> : <FunctionalStatus key={post.postId} post={post} author={profile} />)
        }
      </div>
    </TabPanel>
  </Tabs>
      
      </div>
    </div>
  );
};

export default UsersProfile;
