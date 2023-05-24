import MyButton from "../../components/MyButton";
import { RiMessage3Line } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { HiBellAlert } from "react-icons/hi2";
import { MdContacts } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

interface NavProps {
  className?: string;
  logout: ()=> void
}

function Nav(props: NavProps) {
  return (
    <nav
      className={`flex flex-col items-center bg-gray-900 py-5 text-white px-3  ${props.className}`}
    >
      <div className="flex flex-col flex-grow py-24 justify-evenly">
        <MyButton theme="primary" label={<HiBellAlert size={"2em"} />} />
        <MyButton theme="primary" label={<RiMessage3Line size={"2em"} />} />
        <MyButton theme="primary" label={<TiGroup size={"2em"} />} />
        <MyButton theme="primary" label={<MdContacts size={"2em"} />} />
        <MyButton theme="primary" label={<BsThreeDots size={"2em"} />} />
      </div>
      <MyButton theme="primary" label={<AiOutlineSetting size={"2em"} />} func={props.logout} />
    </nav>
  );
}

export default Nav;
