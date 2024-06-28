import { Outlet } from "react-router-dom";
import NavBar from "./sharedComponents/NavBar";

const Layout = () => {
  return (
    <div>
        <NavBar></NavBar>
      <div className="lg:ml-[250px] md:ml-[78px] mb-[80px] md:mb-0 bg-black min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
