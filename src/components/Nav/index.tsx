import MyButton from "../../components/MyButton";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearAllStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function Nav() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    navigate("/login");
    clearAllStorage();
    window.location.reload();
  };

  return (
    <nav
      className={`flex justify-end  items-center  text-white py-2 space-x-4 px-8`}
    >
      <div className="flex  flex-col text-black text-end">
        <p className=" font-semibold text-lg">{user.name}</p>
        <p className=" font-thin text-xs">{user.userType}</p>
      </div>
      <MyButton
        theme="primary"
        label={<AiOutlineLogout size={"1.5em"} />}
        func={handleLogOut}
      />
    </nav>
  );
}

export default Nav;
