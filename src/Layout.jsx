import { Outlet } from "react-router-dom";
import NavBar from "./sharedComponents/NavBar";

const Layout = () => {
  return (
    <div>
        <NavBar></NavBar>
      <div className="lg:ml-[250px] md:ml-[78px] mb-[80px] md:mb-0 bg-black md:min-h-screen min-h-[calc(100vh-80px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
