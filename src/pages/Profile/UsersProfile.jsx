import {  useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import useAuth from "../../custom hooks/useAuth";
import Swal from "sweetalert2";

const UsersProfile = () => {
  const profile = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const {auth} = useAuth()
  const followerAccounts = profile.followerAccounts
  const [isFollowing, setIsFollowing] = useState([])
  const [followersCount, setFollowersCount] = useState(profile.followers)
  console.log(profile.followerAccounts)
  useEffect(()=>{
    setIsFollowing(profile.followerAccounts.filter(follower=> follower === auth?.currentUser?.email))
  },[ auth?.currentUser?.email])
  console.log("isfollowing",isFollowing)
  const handleFollow = ()=>{
    setFollowersCount(parseInt(profile.followers) +1 )
    setIsFollowing([auth?.currentUser?.email])
    axiosSecure.put(`/users/${profile._id}`, {
      followers: parseInt(profile.followers) + 1,
      followerAccounts: [...followerAccounts, auth?.currentUser?.email]
    })
    .then(res=>{
      console.log(res.data)
    })
  }
  const handleUnfollow = () =>{
    Swal.fire({
      title: 'Success',
      text: 'Account created Successfully',
      icon: 'success',
      color:'black',
      confirmButtonText: 'OK',
      cancelButtonText: 'cancel',
      showCancelButton: true,
      confirmButtonColor: 'black',
    })
    .then(()=>{
      setFollowersCount(followersCount - 1)
      setIsFollowing([])
      axiosSecure.put(`/users/${profile._id}`, {
        followers: parseInt(followersCount) - 1,
        followerAccounts: followerAccounts.filter((follower)=>follower !== auth?.currentUser?.email )
      })
      .then(res=>{
        console.log(res.data)
      })
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
      <div className="mt-24">
        <h1>posts</h1>
      </div>
    </div>
  );
};

export default UsersProfile;
