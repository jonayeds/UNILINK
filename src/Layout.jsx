import { Outlet } from "react-router-dom";
import NavBar from "./sharedComponents/NavBar";

const Layout = () => {
  return (
    <div>
        <NavBar></NavBar>
      <div className="p-4 sm:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
