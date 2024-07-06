import {  useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useAuth from "../../custom hooks/useAuth";
import Swal from "sweetalert2";

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
    setFollowersCount(parseInt(profile.followers) +1 )
    setIsFollowing([auth?.currentUser?.email])
    axiosSecure.put(`/users/${profile.email}`, {
      followers: parseInt(profile.followers) + 1,
      followerAccounts: [...followerAccounts, auth?.currentUser?.email]
    })
    .then(res=>{
      console.log(res.data)
      axiosSecure.get(`/users/email/${auth?.currentUser?.email}`)
    .then(p=>{
      console.log(p.data)
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
  return (
    <div className="flex flex-col items-center  pt-12">
      <div className="flex gap-16 items-start">
        <img src={profile.image} alt="" className="w-32 rounded-full" />
        <div>
          <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-2xl font-semibold text-white">{profile.fullName}</p>
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
            <div className="flex flex-col items-center">
                <p className="text-white">{followersCount}</p>
                <p>followers</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-white">{profile.following}</p>
                <p>following</p>
            </div>
          </div>
          <p className="mt-4">
            Bio
          </p>
        </div>
      </div>
      <div className="mt-20 w-full md:px-12 px-4">
      <hr className="border-gray-600 border   " />
      <div className="grid grid-cols-3 mt-4 lg:w-[750px] md:w-[600px] w-[90vw] mx-auto "> 
        {
          profile.posts.map(post=> <div key={profile._id} className=" lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[30vw] h-[30vw] overflow-hidden  rounded-md border-gray-500 border-2  flex justify-center items-center">
            <img src={post.uploadImg} alt="" className=" w-full" />
          </div>)
        }
      </div>
      </div>
    </div>
  );
};

export default UsersProfile;
