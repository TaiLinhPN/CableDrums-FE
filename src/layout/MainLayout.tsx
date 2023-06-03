import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Nav />
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  ); 
};

export default MainLayout;
