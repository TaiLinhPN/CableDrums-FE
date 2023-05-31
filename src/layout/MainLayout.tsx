import { Outlet } from "react-router-dom";
import SitaBar from "../components/SideBar";
import Nav from "../components/Nav";


const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Nav />
      <div className="flex flex-grow">
        <aside className="bg-gray-200 w-64 py-6 px-4">
          <SitaBar/>
        </aside>
        <main className="flex-grow bg-gray-100 p-6"><Outlet/></main>
      </div>
    </div>
  );
};

export default MainLayout;
