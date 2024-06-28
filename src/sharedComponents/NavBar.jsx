import { GoBell, GoGear, GoHome, GoPlus } from "react-icons/go";
import logoPrimary from '../assets/logoPrimaryPNG(white).png'
import logoSecondary from '../assets/logoSecondary(white).png'
import { RiSearch2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";
import Swal from "sweetalert2";
const NavBar = () => {
  const {auth, userSignOut} = useAuth()
  const user = auth.currentUser
  const navigate = useNavigate()
  const handleSignOut =()=>{
    userSignOut()
    .then(()=>{
      Swal.fire({
				title: 'Success',
				text: 'Signed Out Successfully',
				icon: 'success',
				color:'black',
				confirmButtonText: 'OK',
				confirmButtonColor: 'black',
			})
      .then(()=>{
        navigate('/')
        window.location.reload()
      })
    })
  }
    return (
        <div className="">
          <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-max  h-screen transition-transform -translate-x-full sm:translate-x-0 hidden md:block"
        aria-label="Sidebar"
      >
        <div className="h-full lg:px-8 md:px-4 py-4 overflow-y-auto   text-gray-300 bg-black border-r-2 border-gray-200 border-opacity-50  ">
          <ul className="space-y-5 font-medium text-2xl pl-2">
            <Link to={'/'} className="flex items-center cursor-pointer">
            <img src={logoSecondary} className="w-32 lg:flex hidden" alt="" />
            <img src={logoPrimary} className="w-8 lg:hidden flex " alt="" />
            </Link>
            <Link to={'/'} className="flex items-center cursor-pointer hover:text-white">
            <GoHome  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Home</p>
            </Link>
            <Link to={'/search'} className="flex items-center cursor-pointer hover:text-white">
            <RiSearch2Line className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Search</p>
            </Link>
            <Link to={'/notifications'} className="flex items-center cursor-pointer hover:text-white">
            <GoBell className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Notifications</p>
            </Link>
            <Link className="flex items-center cursor-pointer hover:text-white">
            <IoChatbubblesOutline className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Chat</p>
            </Link>
            <Link className="flex items-center cursor-pointer hover:text-white">
            <FaRegBookmark  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Saved</p>
            </Link>
            <Link className="flex items-center cursor-pointer hover:text-white">
            <MdPersonOutline  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Profile</p>
            </Link>
            <Link to={'/settings'} className="flex items-center cursor-pointer hover:text-white">
            <GoGear  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Settings</p>
            </Link>
           
            
           
          </ul>
          <ul className="pt-4 mt-4 space-y-5 font-medium border-t border-gray-200 dark:border-gray-700 pl-2 text-2xl">
            {
              user? <li onClick={handleSignOut} className={`flex items-center cursor-pointer `}>
              <PiSignOut  className="mr-2 text-3xl" />
              <p className="lg:flex hidden">Sign Out</p>
              </li> : <li className={`flex items-center cursor-pointer `}>
            <Link to={'/signIn'} className="flex items-center"><PiSignIn  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Sign In</p></Link>
            </li>
            }
          
          
            
          </ul>
        </div>
      </aside>
      

<div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-black border-t-2 border-gray-200 border-opacity-30 left-1/2  block md:hidden">
    
    <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        <Link to={'/'}  className="inline-flex flex-col items-center justify-center p-4  group">
           <GoHome className="text-4xl" />
        </Link>
       
        <Link  className="inline-flex flex-col items-center justify-center p-4  group">
           <GoBell className="text-3xl" />
        </Link>
        
        <Link  className="inline-flex flex-col items-center justify-center p-4  group">
           <GoPlus className="text-5xl" />
       </Link>
       
        <Link  className="inline-flex flex-col items-center justify-center p-4  group">
            <RiSearch2Line className="text-3xl" />
        </Link>
        
        <Link  className="inline-flex flex-col items-center justify-center p-4  group">
            <IoChatbubblesOutline className="text-3xl" />
        </Link>
        <Link  className="inline-flex flex-col items-center justify-center p-4  group">
            <MdPersonOutline className="text-4xl" />
        </Link>
        
    </div>
</div>

        </div>
    );
};

export default NavBar;