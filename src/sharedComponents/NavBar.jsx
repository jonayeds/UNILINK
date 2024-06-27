import { GoBell, GoGear, GoHome, GoPlus } from "react-icons/go";
import logoPrimary from '../assets/logoPrimaryPNG(white).png'
import logoSecondary from '../assets/logoSecondary(white).png'
import { RiSearch2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="">
          <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-max  h-screen transition-transform -translate-x-full sm:translate-x-0 hidden md:block"
        aria-label="Sidebar"
      >
        <div className="h-full lg:px-8 md:px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-5 font-medium text-2xl pl-2">
            <li className="flex items-center">
            <img src={logoSecondary} className="w-32 lg:flex hidden" alt="" />
            <img src={logoPrimary} className="w-8 lg:hidden flex " alt="" />
            </li>
            <li className="flex items-center">
            <GoHome  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Home</p>
            </li>
            <li className="flex items-center">
            <RiSearch2Line className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Search</p>
            </li>
            <li className="flex items-center">
            <GoBell className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Notifications</p>
            </li>
            <li className="flex items-center">
            <IoChatbubblesOutline className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Chat</p>
            </li>
            <li className="flex items-center">
            <FaRegBookmark  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Saved</p>
            </li>
            <li className="flex items-center">
            <MdPersonOutline  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Profile</p>
            </li>
            <li className="flex items-center">
            <GoGear  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Settings</p>
            </li>
           
            
           
          </ul>
          <ul className="pt-4 mt-4 space-y-5 font-medium border-t border-gray-200 dark:border-gray-700 pl-2 text-2xl">
          <li className="flex items-center">
            <Link to={'/signIn'} className="flex items-center"><PiSignIn  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Sign In</p></Link>
            </li>
          <li className="flex items-center">
            <PiSignOut  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Sign Out</p>
            </li>
            
          </ul>
        </div>
      </aside>
      

<div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600 block md:hidden">
    
    <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
           <GoHome className="text-4xl" />
        </button>
       
        <button data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
           <GoBell className="text-3xl" />
        </button>
        
        <button data-tooltip-target="tooltip-post" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
           <GoPlus className="text-5xl" />
       </button>
       
        <button data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <RiSearch2Line className="text-3xl" />
        </button>
        
        <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <IoChatbubblesOutline className="text-3xl" />
        </button>
        <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <MdPersonOutline className="text-4xl" />
        </button>
        
    </div>
</div>

        </div>
    );
};

export default NavBar;