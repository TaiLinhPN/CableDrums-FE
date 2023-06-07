import { useDispatch, useSelector } from "react-redux";
import AdminSpace from "../components/workSpaces/AdminSpace";
import { RootState } from "../redux/store";
import PlannerSpace from "../components/workSpaces/PlannerSpace";
import ProjectContractorSpace from "../components/workSpaces/ProjectContractor";
import SupplyVendorSpace from "../components/workSpaces/SupplyVendor";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
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
} from "../redux/slice/ContractSlice";
import { Order, setNewOrder, updateOrder } from "../redux/slice/orderSlice";
import { messageWaning } from "../utils/notify";

const MainPage = () => {
  const dispatch = useDispatch();
  const { userId, userType } = useSelector((state: RootState) => state.user);

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
      console.log(data);
      dispatch(setNewContract(data));
    });

    socket.on("update-contract-new-order", (data: Contract) => {
      console.log(data);
      dispatch(
        updateContractWhenNewOrder({
          contractId: data._id,
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
    if (

      userType === "admin" ||
      userType === "planner"
    ) {
      dispatch(setNewOrder(data));
    }else if (      (userType === "supplyVendor" && data.supplyVendor._id === userId )||
      (userType === "projectContractor" && data.projectContractor._id === userId)) {
      dispatch(setNewOrder(data));
      messageWaning("New Order was created")
      }
    });
    socket.on("update-order", (data: Order) => {
      dispatch(updateOrder(data));
    });
  }, []);

  switch (userType) {
    case "admin":
      return <AdminSpace />;

    case "planner":
      return <PlannerSpace />;

    case "supplyVendor":
      return <SupplyVendorSpace />;

    case "projectContractor":
      return <ProjectContractorSpace />;

    default:
      return (
        <div className="flex flex-col  items-center">
          <Spin tip="Loading" size="large"></Spin>
          <div>User not found</div>
          <Navigate to="/login" />
        </div>
      );
  }
};

export default MainPage;
