import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearAllStorage } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { socket } from "../../utils/socket";
import Notification from "../Notification"

function Nav() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
const userId = useSelector((state: RootState) => state.user.userId);
  const handleLogOut = () => {
    socket.emit("leave", userId);
    navigate("/login");
    clearAllStorage();
    window.location.reload();
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className={`flex justify-between items-center  py-2  px-8`}>
      <Link to="/" className="flex items-center font-semibold text-lg">
        <img src="../../../vite.svg" alt="" className="w-6 mr-2" />
        EnergySure tech
      </Link>
      <div className="flex space-x-4 items-center ">
        <div className="flex  flex-col text-black text-end">
          <p className=" font-thin text-xs">{user.userType}</p>
          <p className=" font-semibold text-lg">{user.name}</p>
        </div>
        <div className="nav-icon space-x-2">
          <Button onClick={showDrawer}>
            <MdNotificationsActive
              className="hover:text-maize"
              size={"1.5em"}
            />
          </Button>
          <Button onClick={handleLogOut}>
            <AiOutlineLogout className="hover:text-maize" size={"1.5em"} />
          </Button>
        </div>
      </div>
      <Drawer
        title="Notification"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Notification />
      </Drawer>
    </nav>
  );
}

export default Nav;
