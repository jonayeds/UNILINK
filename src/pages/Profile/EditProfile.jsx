import { useEffect, useRef, useState } from "react";
import useAuth from "../../custom hooks/useAuth";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoCloudUpload } from "react-icons/io5";
import axios from "axios";


const EditProfile = () => {
    const {auth} = useAuth()
    const currentUser = auth?.currentUser
    const axiosSecure = useAxiosSecure()
    const [profile, setProfile] = useState({}) 
    const navigate = useNavigate()
    const [image , setImage] = useState('')
    const inputRef= useRef()
    useEffect(()=>{
        axiosSecure.get(`/users/${currentUser?.email}`)
        .then(res=>{
            setProfile(res.data)
        })
    },[currentUser?.email, axiosSecure])
    const handleImageInput = ()=>{
        inputRef.current.click()
    }
    const handleImageChange =(e)=>{
        const img = e.target.files[0]
        setImage(img)
    }
    const updateProfile = e=>{
        e.preventDefault()
        const form = e.target
        const fName = form.fName.value
        const sName = form.sName.value
        const formData = new FormData()
        formData.append('image', image)
        const bio = form.bio.value
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, formData)
        .then(img=>{
            console.log({fName, sName, image, bio})
            axiosSecure.put(`/users/edit/${profile._id}`, {
                fName, sName, image: img.data.data.display_url, bio, fullName: fName + ' ' + sName
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
        })

    }
    return (
        <div className="md:pt-24 pt-12">
            <div className="">
                <h1 className="text-center text-4xl mb-10 text-white">Edit Profile</h1>
            </div>

<form onSubmit={updateProfile} className="max-w-2xl mx-auto px-4">
 
  
    <div className="">
				<p className='text-center mb-2'>Profile Image</p>
			<div onClick={handleImageInput} className="md:w-[150px] border-4 border-gray-500 rounded-full md:h-[150px] w-32 h-32 flex flex-col items-center justify-center bg-gray-800 hover:bg-black duration-500  overflow-hidden mx-auto">
               {
                image? <img src={URL.createObjectURL(image)} alt="" />: <div className="flex flex-col items-center">
                {/* <IoCloudUpload className="text-3xl mb-4" />
                <h1 className='text-sm md:text-lg'>Click to upload</h1> */}
                <img src={profile.image} alt="" />
                </div>
               }
                       
               <input onChange={handleImageChange} type="file" ref={inputRef} className="hidden"  />
                           </div>
				</div>
  <div className="grid md:grid-cols-2 md:gap-6 mt-8">
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="fName" id="floating_first_name" className=" block py-2.5 px-0 w-full  text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={profile.fName} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="sName" id="floating_first_name" className=" block py-2.5 px-0 w-full  text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={profile.sName} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Second name</label>
    </div>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <textarea type="email" name="bio" id="floating_email" className=" block py-2.5 px-0 w-full  text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-[#aabbff] focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue={profile?.bio}  />
      <label  className="peer-focus:font-medium absolute text-lg text-gray-400  duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#aabbff]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio</label>
  </div>
 
  <button type="submit" className="text-white bg-[#7f91da] duration-300 hover:bg-[#6c7bb9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Save Changes</button>
</form>

        </div>
    );
};

export default EditProfile;