import bg from '../assets/signUpBbg.jpg'
import logo from '../assets/logoSecondary(white).png'
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../custom hooks/useAuth';
import Swal from 'sweetalert2'
const SignUp = () => {
	const  {createUser, updateUser} = useAuth()
	const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const onSubmit = data =>{
        const email = data.email
        const password = data.password
		const image = data.image
		const fName = data.fName 
		const sName =  data.sName
		const name = fName + " " + sName
        console.log({
            email, password,image, fName, sName
        })
		createUser(email, password)
		.then(()=>{
			updateUser(name, image)
			Swal.fire({
				title: 'Success',
				text: 'Account created Successfully',
				icon: 'success',
				color:'black',
				confirmButtonText: 'OK',
				confirmButtonColor: 'black',
			})
			navigate('/')
		}).catch(err=>{
			console.log(err.message)
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
			{/* <div className="space-y-2">
				<label htmlFor="image" className="block text-sm">Profile Image</label>
				<input type="file" accept='image/*' name="image" id="image" placeholder="" className="w-full outline-none px-3 py-2 border rounded-md   " />
			</div> */}
			<div className="space-y-2">
				<label htmlFor="image" className="block text-sm">Profile Image</label>
				<input type="text"  name="image" {...register("image")} id="image" placeholder="profile image" className="w-full outline-none px-3 py-2 border rounded-md   " />
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
		<button type="submit" className="w-full px-8 py-3 bg-white text-black text-xl font-semibold rounded-md ">Sign in</button>
	</form>
</div>
        </div>
    );
};

export default SignUp;