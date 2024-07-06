import { Link } from "react-router-dom";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { useEffect, useState } from "react";

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
      <div className="mt-20 w-full md:px-12 px-4">
      <hr className="border-gray-600 border   " />
      <div className="grid grid-cols-3 mt-4 lg:w-[750px] md:w-[600px] w-[90vw] mx-auto "> 
        {
          profile.posts.map(post=> <div key={profile._id} className=" lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[30vw] h-[30vw] overflow-hidden border  flex justify-center items-center">
            <img src={post.uploadImg} alt="" className=" w-full" />
          </div>)
        }
      </div>
      </div>
    </div>
                </div>
            }
        </div>
    );
};

export default Profile;
