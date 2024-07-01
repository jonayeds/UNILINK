import { Link } from "react-router-dom";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import Redirector from "../../sharedComponents/Redirector";
import { useEffect, useState } from "react";

const Profile = () => {
    const {auth} = useAuth()
    const user = auth.currentUser
    const [profile, setProfile] = useState({})
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get(`/users/email/${user.email}`)
        .then((res)=>{
            setProfile(res.data)
        })
    }, [axiosSecure, user])

    return (
        <div>
            {
                !user? <Redirector></Redirector>: <div>
                    <div className="flex flex-col items-center  pt-12">
      <div className="flex gap-16 items-center md:flex-row flex-col w-full md:w-max">
        <img src={user.photoURL} alt="" className="w-32 rounded-full" />
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
            <div className="flex flex-col items-center">
                <p className="text-white">{profile.followers}</p>
                <p>followers</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-white">{profile.following}</p>
                <p>following</p>
            </div>
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
      <div className="mt-24">
        <h1>posts</h1>
      </div>
    </div>
                </div>
            }
        </div>
    );
};

export default Profile;