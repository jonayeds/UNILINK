import bg from '../assets/signUpBbg.jpg'
import logo from '../assets/logoSecondary(white).png'
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../custom hooks/useAuth';
import Swal from 'sweetalert2'
import useAxiosSecure from '../custom hooks/useAxiosSecure';
import { useRef, useState } from 'react';
import { IoCloudUpload } from 'react-icons/io5';
import axios from 'axios';
const SignUp = () => {
	const  {createUser, updateUser} = useAuth()
	const navigate = useNavigate()
	const axiosSecure = useAxiosSecure()
	const [image , setImage] = useState('')
	const inputRef= useRef()
	const handleImageInput = ()=>{
        inputRef.current.click()
    }
    const handleImageChange =(e)=>{
        const img = e.target.files[0]
        setImage(img)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const onSubmit = data =>{
		const formData = new FormData()
        formData.append('image', image)
        const email = data.email
        const password = data.password
		const fName = data.fName 
		const sName =  data.sName
		const fullName = fName + " " + sName
		axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, formData)
		.then(img =>{
			const user = {email, password, image : img.data.data.display_url, fName, sName, fullName, followers:0, following:0, postsCount:0, idParam: 0 , followerAccounts:[], followingAccounts: [], posts: [] }
			createUser(email, password)
			.then(()=>{
				updateUser(fullName, image)  
				
				
	
				Swal.fire({
					title: 'Success',
					text: 'Account created Successfully',
					icon: 'success',
					color:'black',
					confirmButtonText: 'OK',
					confirmButtonColor: 'black',
				})
				axiosSecure.post('/users', user)
				.then((res)=>{
					console.log(res.data)
				})
				navigate('/')
			}).catch(()=>{
				Swal.fire({
					title: 'Error',
					text: 'Email Already in use',
					icon: 'error',
					color:'black',
					confirmButtonText: 'OK',
					confirmButtonColor: 'black',
				})
			})

		})
    }
    return (
        <div className="flex flex-row-reverse justify-center
		import Link from 'react-router-dom'  items-center min-h-screen bg-black">
            <div className="max-w-md">
                <img src={bg} className="w-full md:flex hidden " alt="" />
               <div className="absolute">  
               <img src={logo} className="relative opacity-80 bottom-72 left-16  w-80 mx-auto  md:flex hidden"  alt="" />
               </div>

            </div>
            <div className={` max-w-md p-4 rounded-md shadow sm:p-8 `}
            >
	<h2 className="mb-3 text-3xl font-semibold text-center">Create your account</h2>
	<p className="text-sm text-center ">Already have an account?
		<Link to={'/signIn'} className="focus:underline hover:underline ml-2">Sign in here</Link>
	</p>
	<div className="my-6 space-y-4">
		<button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 ">
        <FaGoogle className="text-xl" />
			<p>Login with Google</p>
		</button>
		<button aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 ">
			<FaGithub className="text-xl" />
			<p>Login with GitHub</p>
		</button>
		
	</div>
	<div className="flex items-center w-full my-4">
		<hr  className="w-full " />
		<p className="px-3 ">OR</p>
		<hr  className="w-full " />
	</div>
	<form  onSubmit={handleSubmit(onSubmit)} className="space-y-8">
		<div className="space-y-4">
				<div>
				<p className='text-center mb-2'>Profile Image</p>
			<div onClick={handleImageInput} className="md:w-[150px] border-4 border-gray-500 rounded-full md:h-[150px] w-32 h-32 flex flex-col items-center justify-center bg-gray-800 hover:bg-black duration-500  overflow-hidden mx-auto">
               {
                image? <img src={URL.createObjectURL(image)} alt="" />: <div className="flex flex-col items-center">
                <IoCloudUpload className="text-3xl mb-4" />
                <h1 className='text-sm md:text-lg'>Click to upload</h1>
                </div>
               }
                       
               <input onChange={handleImageChange} type="file" ref={inputRef} className="hidden"  />
                           </div>
				</div>
            <div className='grid grid-cols-2 gap-5 '>
                <div className='space-y-2'>
                <label htmlFor="email" className="block text-sm">First Name</label>
				<input type="text" name="fName" {...register("fName")} id="email" placeholder="First Name" className="w-full outline-none px-3 py-2 border rounded-md   " />
                </div>
                <div className='space-y-2'>
                <label htmlFor="email" className="block text-sm">Second Name</label>
				<input type="text" name="sName"  {...register("sName")} id="sName" placeholder="Second Name" className="w-full outline-none px-3 py-2 border rounded-md   " />
                </div>
            </div>

			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<div className='flex  items-center gap-4' >
                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full outline-none px-3 py-2 border rounded-md   " {...register("email", { required: true })} />
                {errors.email && <span className='text-red-400'> required*</span>}
                </div>
			</div>
			<div className="space-y-2">
					<label htmlFor="password" className="text-sm">Password</label>
				<div className='flex  items-center gap-4'>
                <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md   outline-none" />
                {errors.password && <span className='text-red-400'>required*</span>}
                </div>
			</div>
		</div>
		<button type="submit" className="w-full px-8 py-3 bg-white text-black text-xl font-semibold rounded-md ">Sign Up</button>
	</form>
</div>
        </div>
    );
};

export default SignUp;