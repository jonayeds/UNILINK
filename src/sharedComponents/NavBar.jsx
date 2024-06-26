import { GoBell, GoGear, GoHome } from "react-icons/go";
import logoPrimary from '../assets/logoPrimaryPNG(white).png'
import logoSecondary from '../assets/logoSecondary(white).png'
import { RiSearch2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { PiSignIn, PiSignOut } from "react-icons/pi";
const NavBar = () => {
    return (
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
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700 pl-2 text-2xl">
          <li className="flex items-center">
            <PiSignIn  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Sign In</p>
            </li>
          <li className="flex items-center">
            <PiSignOut  className="mr-2 text-3xl" />
            <p className="lg:flex hidden">Sign Out</p>
            </li>
            
          </ul>
        </div>
      </aside>
    );
};

export default NavBar;