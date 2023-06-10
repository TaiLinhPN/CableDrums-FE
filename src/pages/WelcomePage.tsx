import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const WelcomePage = () => {
  const {name} = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="text-center">
        <p className="text-xl">
          Hello <span className="font-bold">{name}</span>
        </p>
        <p className="text-xl">Welcome back!</p>
      </div>
      <img className="w-1/3" src="../../theMen.png" alt="" />
      <p>select a table in the left side to start working</p>
    </div>
  );
};

export default WelcomePage;
