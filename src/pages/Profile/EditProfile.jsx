import { useEffect, useState } from "react";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const {auth} = useAuth()
    const currentUser = auth?.currentUser
    const axiosSecure = useAxiosSecure()
    const [profile, setProfile] = useState({}) 
    const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.get(`/users/${currentUser?.email}`)
        .then(res=>{
            setProfile(res.data)
        })
    },[currentUser?.email, axiosSecure])
    const updateProfile = e=>{
        e.preventDefault()
        const form = e.target
        const fName = form.fName.value
        const sName = form.sName.value
        const image = form.image.value
        const bio = form.bio.value
        console.log({fName, sName, image, bio})
        axiosSecure.put(`/users/edit/${profile._id}`, {
            fName, sName, image, bio, fullName: fName + ' ' + sName
        })
        .then(res=>{
            console.log(res)
            if(res.data.matchedCount){
                Swal.fire({
                    title: 'Success',
                    text: 'Saved Changes',
                    icon: 'success',
                    color:'black',
                    confirmButtonText: 'Yes',
                    confirmButtonColor: 'black',
                  })
                  navigate('/profile')
            }
        })

    }
    return (
        <div className="md:pt-24 pt-12">
            <div className="">
                <h1 className="text-center text-4xl mb-10 text-white">Edit Profile</h1>
            </div>

<form onSubmit={updateProfile} className="max-w-2xl mx-auto px-4">
 
  
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="fName" id="floating_first_name" className=" block py-2.5 px-0 w-full  text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={profile.fName} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="sName" id="floating_last_name" className=" block py-2.5 px-0 w-full  text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue={profile.sName} required />
        <label   className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="image" id="floating_first_name" className=" block py-2.5 px-0 w-full  text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={profile.image} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Profile Picture</label>
    </div>
  <div className="relative z-0 w-full mb-8 group">
      <textarea type="email" name="bio" id="floating_email" className=" block py-2.5 px-0 w-full  text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue={profile?.bio} required />
      <label  className="peer-focus:font-medium absolute text-lg text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio</label>
  </div>
 
  <button type="submit" className="text-white bg-[#7f91da] duration-300 hover:bg-[#6c7bb9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Save Changes</button>
</form>

        </div>
    );
};

export default EditProfile;