import { FaGithub, FaGoogle } from "react-icons/fa";
import bg from '../assets/signInBg.jpg'
import logo from '../assets/logoSecondary(white).png'
const SignIn = () => {
    return (
        <div className="flex justify-center  items-center min-h-screen bg-black">
            <div className="max-w-md">
                <img src={bg} className="w-full md:flex hidden " alt="" />
                <img src={logo} className="relative bottom-72  w-80 mx-auto  md:flex hidden"  alt="" />

            </div>
            <div className={` max-w-md p-4 rounded-md shadow sm:p-8 `}
            >
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<p className="text-sm text-center ">Dont have account?
		<a href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Sign up here</a>
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
	<form noValidate="" action="" className="space-y-8">
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full outline-none px-3 py-2 border rounded-md   " />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm">Password</label>
					<a rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Forgot password?</a>
				</div>
				<input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md   outline-none" />
			</div>
		</div>
		<button type="submit" className="w-full px-8 py-3 bg-white text-black text-xl font-semibold rounded-md ">Sign in</button>
	</form>
</div>
        </div>
    );
};

export default SignIn;