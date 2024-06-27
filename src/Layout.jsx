import { Outlet } from "react-router-dom";
import NavBar from "./sharedComponents/NavBar";

const Layout = () => {
  return (
    <div>
        <NavBar></NavBar>
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
