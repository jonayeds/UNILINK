import {  GoGear, GoHome, GoHomeFill, GoPlus } from "react-icons/go";
import logoPrimary from '../assets/logoPrimaryPNG(white).png'
import logoSecondary from '../assets/logoSecondary(white).png'
import { RiLoginBoxFill, RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
// import { IoChatbubbles, IoChatbubblesOutline } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";
import Swal from "sweetalert2";
import { IoMdPerson } from "react-icons/io";
import { FaCirclePlus, FaGear } from "react-icons/fa6";
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


            <NavLink to={'/'} className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/'} className={({isActive})=> isActive? 'hidden': ''}><GoHome className="mr-2 text-3xl"  /></NavLink>
            <NavLink to={'/'} className={({isActive})=> isActive? '': 'hidden'} ><GoHomeFill  className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Home</p>
            </NavLink>


            <NavLink to={'/search'} className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/search'} className={({isActive})=> isActive? 'hidden': ''}><RiSearch2Line className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/search'} className={({isActive})=> isActive? '': 'hidden'} ><RiSearch2Fill  className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Search</p>
            </NavLink>


            {/* <NavLink to={'/notifications'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/notifications'} className={({isActive})=> isActive? 'hidden': ''}><GoBell className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/notifications'} className={({isActive})=> isActive? '': 'hidden'} ><GoBellFill  className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Notifications</p>
            </NavLink> */}


            {/* <NavLink to={'/chat'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/chat'} className={({isActive})=> isActive? 'hidden': ''}><IoChatbubblesOutline className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/chat'} className={({isActive})=> isActive? '': 'hidden'} ><IoChatbubbles className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Chat</p>
            </NavLink> */}


            <NavLink to={'/saved'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/saved'} className={({isActive})=> isActive? 'hidden': ''}><FaRegBookmark  className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/saved'} className={({isActive})=> isActive? '': 'hidden'} ><FaBookmark className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Saved</p>
            </NavLink>
            

            <NavLink to={'/profile'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/profile'} className={({isActive})=> isActive? 'hidden': ''}><MdPersonOutline  className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/profile'} className={({isActive})=> isActive? '': 'hidden'} ><IoMdPerson className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Profile</p>
            </NavLink>

            

            <NavLink to={'/settings'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/settings'} className={({isActive})=> isActive? 'hidden': ''}><GoGear  className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/settings'} className={({isActive})=> isActive? '': 'hidden'} ><FaGear className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Settings</p>
            </NavLink>
           
            
            
           
          </ul>
          <ul className="pt-4 mt-4 space-y-5 font-medium border-t border-gray-200 dark:border-gray-700 pl-2 text-2xl">
            {
              user? <div className="space-y-5">
                 <li onClick={handleSignOut} className={`flex items-center cursor-pointer hover:text-white duration-300`}>
              <PiSignOut  className="mr-2 text-3xl" />
              <p className="lg:flex hidden">Sign Out</p>
              </li>
              <li className={`flex items-center cursor-pointer `}>


<NavLink to={'/upload'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
<NavLink to={'/upload'} className={({isActive})=> isActive? 'hidden': ''}><GoPlus   className="mr-2 text-3xl" /></NavLink>
<NavLink to={'/upload'} className={({isActive})=> isActive? '': 'hidden'} ><FaCirclePlus className="mr-2 text-3xl" /></NavLink>
<p className="lg:flex hidden">Post</p>
</NavLink>



</li>
              </div> : <li className={`flex items-center cursor-pointer `}>


              <NavLink to={'/SignIn'}className={({isActive}) => isActive ? 'flex items-center cursor-pointer hover:text-white duration-300 scale-110' : 'flex items-center cursor-pointer hover:text-white duration-300'}>
            <NavLink to={'/SignIn'} className={({isActive})=> isActive? 'hidden': ''}><PiSignIn  className="mr-2 text-3xl" /></NavLink>
            <NavLink to={'/SignIn'} className={({isActive})=> isActive? '': 'hidden'} ><RiLoginBoxFill className="mr-2 text-3xl" /></NavLink>
            <p className="lg:flex hidden">Sign In</p>
            </NavLink>


            
            </li>
            }
          
          
            
          </ul>
        </div>
      </aside>
      

<div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-black border-t-2 border-gray-200 border-opacity-30 left-1/2  block md:hidden">
    
    <div className="grid h-full max-w-lg grid-cols-4 mx-auto text-white">
        <NavLink to={'/'}   className="inline-flex flex-col items-center justify-center p-4  group">
           <NavLink to={'/'} className={({isActive})=> isActive? 'hidden': ''}><GoHome className="mr-2 text-2xl"  /></NavLink>
            <NavLink to={'/'} className={({isActive})=> isActive? '': 'hidden'} ><GoHomeFill  className="mr-2 text-2xl" /></NavLink>
        </NavLink>
       
        {/* <NavLink to={'/notifications'}  className="inline-flex flex-col items-center justify-center p-4  group">
           <NavLink to={'/notifications'} className={({isActive})=> isActive? 'hidden': ''}><GoBell className=" text-2xl" /></NavLink>
            <NavLink to={'/notifications'} className={({isActive})=> isActive? '': 'hidden'} ><GoBellFill  className=" text-2xl" /></NavLink>
        </NavLink> */}
        
        <NavLink to={'/upload'} className={({isActive})=> isActive? ' inline-flex flex-col items-center justify-center p-4  scale-125': ' inline-flex flex-col items-center justify-center p-4  '}>
          
           <GoPlus className="text-4xl" />
       </NavLink>
       
        <NavLink  className="inline-flex flex-col items-center justify-center p-4  group">
        <NavLink to={'/search'} className={({isActive})=> isActive? 'hidden': ''}><RiSearch2Line className=" text-2xl" /></NavLink>
        <NavLink to={'/search'} className={({isActive})=> isActive? '': 'hidden'} ><RiSearch2Fill  className=" text-2xl" /></NavLink>
        </NavLink>
        
        {/* <NavLink to={'/chat'}  className="inline-flex flex-col items-center justify-center p-4  group">
        <NavLink to={'/chat'} className={({isActive})=> isActive? 'hidden': ''}><IoChatbubblesOutline className="mr-2 text-3xl" /></NavLink>
        <NavLink to={'/chat'} className={({isActive})=> isActive? '': 'hidden'} ><IoChatbubbles className="mr-2 text-3xl" /></NavLink>
        </NavLink> */}
        <NavLink to={'/profile'}  className="inline-flex flex-col items-center justify-center p-4  group">
        <NavLink to={'/profile'} className={({isActive})=> isActive? 'hidden': ''}><MdPersonOutline  className=" text-2xl" /></NavLink>
        <NavLink to={'/profile'} className={({isActive})=> isActive? '': 'hidden'} ><IoMdPerson className=" text-2xl" /></NavLink>
        </NavLink>
        
    </div>
</div>

        </div>
    );
};

export default NavBar;