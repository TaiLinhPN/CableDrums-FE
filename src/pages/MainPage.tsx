import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import {
  Account,
  removeAccount,
  setNewAccount,
} from "../redux/slice/accountSlice";
import {
  Contract,
  removeContract,
  setNewContract,
  updateContractWhenNewOrder,
  updateContractWhenOrderCompleted,
} from "../redux/slice/contractSlice";
import { Order, setNewOrder, updateOrder } from "../redux/slice/orderSlice";
import { messageWaning } from "../utils/notify";
import NotFoundAccountPage from "./NotFoundAccountPage";
import SideBar from "../components/SideBar";
import { FaFileContract } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { MdSwitchAccount } from "react-icons/md";

const MainPage = () => {
  const dispatch = useDispatch();
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const [selectedTable, setSelectedTable] = useState(0);

  const handleButtonClick = (tableNumber: number) => {
    setSelectedTable(tableNumber);
  };
  // listen to the event of account
  useEffect(() => {
    socket.on("new-account", (data: Account) => {
      dispatch(setNewAccount(data));
    });

    socket.on("remove-account", (userId) => {
      dispatch(removeAccount(userId));
    });
  }, []);

  // listen to the event of contract
  useEffect(() => {
    socket.on("new-contract", (data: Contract) => {
      if (userType === "admin" || userType === "planner") {
        dispatch(setNewContract(data));
      } else if (
        userType === "supplyVendor" &&
        data.supplyVendor._id === userId
      ) {
        dispatch(setNewContract(data));
        messageWaning("New Contract was created");
      }
    });

    socket.on("update-contract-new-order", (data: Contract) => {
      dispatch(
        updateContractWhenNewOrder({
          contractId: data._id,
          cableRequired: data.cableRequired,
        })
      );
    });

    socket.on("update-contract-complete-order", (data: Contract) => {
      dispatch(
        updateContractWhenOrderCompleted({
          contractId: data._id,
          cableDelivered: data.cableDelivered,
          cableRequired: data.cableRequired,
        })
      );
    });

    socket.on("remove-contract", (userId) => {
      dispatch(removeContract(userId));
    });
  }, []);

  // listen to the event of order
  useEffect(() => {
    socket.on("new-order", (data: Order) => {
      if (userType === "admin" || userType === "planner") {
        dispatch(setNewOrder(data));
      } else if (
        (userType === "supplyVendor" && data.supplyVendor._id === userId) ||
        (userType === "projectContractor" &&
          data.projectContractor._id === userId)
      ) {
        dispatch(setNewOrder(data));
        messageWaning("New Order was created");
      }
    });
    socket.on("update-order", (data: Order) => {
      if (userType === "planner") {
        messageWaning("An Order was updated ");
        dispatch(updateOrder(data));
      } else if (userType === "supplyVendor") {
        if (data.supplyVendor._id === userId) {
          dispatch(updateOrder(data));
          if (data.status !== "readyForPickup") {
            messageWaning("An Order was updated ");
          }
        }
      } else if (userType === "projectContractor") {
        console.log("projectContractor");
        console.log(data.projectContractor._id);

        if (data.projectContractor._id === userId) {
          dispatch(updateOrder(data));
          if (data.status !== "completed") {
            messageWaning("An Order was updated ");
          }
        }
      }
    });
  }, []);

  const userTypeArr = ["admin", "planner", "supplyVendor", "projectContractor"];
  if (!userId || !userTypeArr.includes(userType)) {
    return <NotFoundAccountPage />;
  }

  const links = [
    {
      to: "account",
      onClick: () => handleButtonClick(1),
      text: "Account",
      icon: <MdSwitchAccount size={"1.5em"} />,
      isSelected: selectedTable === 1,
      allowedUserTypes: ["admin"],
    },
    {
      to: "contract",
      onClick: () => handleButtonClick(2),
      text: "Contract",
      icon: <FaFileContract size={"1.5em"} />,
      isSelected: selectedTable === 2,
      allowedUserTypes: ["admin", "planner", "supplyVendor"],
    },
    {
      to: "order",
      onClick: () => handleButtonClick(3),
      text: "Request",
      icon: <BiFoodMenu size={"1.5em"} />,
      isSelected: selectedTable === 3,
      allowedUserTypes: [
        "admin",
        "planner",
        "supplyVendor",
        "projectContractor",
      ],
    },
  ];

  const renderLinks = () => {
    return links.map((link, index) => {
      const { to, onClick, text, icon, isSelected, allowedUserTypes } = link;
      if (allowedUserTypes.includes(userType)) {
        return (
          <Link
            key={index}
            to={to}
            onClick={onClick}
            className={`${
              isSelected && " bg-yellow-red font-medium text-white"
            } px-4 py-2 flex space-x-2`}
          >
            {icon}
            <p>{text}</p>
          </Link>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex flex-grow">
      <SideBar>
        <div className="flex flex-col">{renderLinks()}</div>
      </SideBar>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
