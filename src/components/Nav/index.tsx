import MyButton from "../../components/MyButton";
import { AiOutlineLogout } from "react-icons/ai";

import { logout } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";



function Nav() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user);
  
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
        func={()=>logout()(dispatch)}
      />
    </nav>
  );
}

export default Nav;
