
import bg from '../assets/signInBg.jpg'
import logo from '../assets/logoSecondary(white).png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAuth from "../custom hooks/useAuth";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';
const SignIn = () => {
	const {emailSignIn} = useAuth()
	const navigate = useNavigate()
	const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
	const onSubmit = data =>{
		document.getElementById("loader").classList.remove("hidden")
		document.getElementById("content").classList.add("hidden")
		const email = data.email
		const password = data.password
		emailSignIn(email, password)
		.then(() => {
			Swal.fire({
				title: 'Success',
				text: 'Signed In Successfully',
				icon: 'success',
				color:'black',
				confirmButtonText: 'OK',
				confirmButtonColor: 'black',
			})
			navigate('/')
		}).catch((err) => {
			document.getElementById("loader").classList.add("hidden")
			document.getElementById("content").classList.remove("hidden")
		toast.error("Wrong password or email")
			console.log(err.message)
		});
	}
	
    return (
       <>
	<div id="loader" className="absolute lg:w-[calc(100vw-206px)] md:w-[calc(100vw-88px)] w-[100vw] h-screen z-10 bg-black bg-opacity-50 flex justify-center items-center hidden">
        <div className='flex   items-end   space-x-2'>
<span className='text-3xl  text-white'>Login In</span>
<div className="flex gap-2">
<div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
</div>
</div>
        </div>
	<div id='content' className="flex justify-center
		import Link from 'react-router-dom'  items-center min-h-screen bg-black text-gray-300">
			<Toaster 
			position="top-center"
			/>
			
            <div className="max-w-md">
                <img src={bg} className="w-full md:flex hidden " alt="" />
               <div className="absolute">  
               <img src={logo} className="relative bottom-72 left-16  w-80 mx-auto  md:flex hidden"  alt="" />
               </div>

            </div>
            <div className={` max-w-md p-4 rounded-md shadow sm:p-8 `}
            >
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<p className="text-sm text-center ">Don`t have account?
		<Link to={'/signUp'} className="focus:underline ml-2 hover:underline text-white">Sign up here</Link>
	</p>
	{/* <div className="my-6 space-y-4">
		<button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 ">
        <FaGoogle className="text-xl" />
			<p>Login with Google</p>
		</button>
		<button onClick={handleGithubLogin} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 ">
			<FaGithub className="text-xl" />
			<p>Login with GitHub</p>
		</button>
		
	</div> */}
	{/* <div className="flex items-center w-full my-4">
		<hr  className="w-full " />
		<p className="px-3 ">OR</p>
		<hr  className="w-full " />
	</div> */}
	<form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-8 mt-12">
		<div className="space-y-4">
		<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<div className='flex  items-center gap-4' >
                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full outline-none px-3 py-2 border rounded-md  bg-black text-white " {...register("email", { required: true })} />
                {errors.email && <span className='text-red-400'> required*</span>}
                </div>
			</div>
			<div className="space-y-2">
					<label htmlFor="password" className="text-sm">Password</label>
				<div className='flex  items-center gap-4'>
                <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md bg-black text-white  outline-none" />
                {errors.password && <span className='text-red-400'>required*</span>}
                </div>
			</div>
		</div>
		<button type="submit" className="w-full px-8 py-3 bg-white text-black text-xl font-semibold rounded-md ">Sign in</button>
	</form>
</div>
        </div>

	</>
    );
};

export default SignIn;