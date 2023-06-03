import { useSelector } from "react-redux";
import AdminSpace from "../components/workSpaces/AdminSpace";
import { RootState } from "../redux/store";
import PlannerSpace from "../components/workSpaces/PlannerSpace";
import ProjectContractorSpace from "../components/workSpaces/ProjectContractorSpace";
import SupplyVendorSpace from "../components/workSpaces/SupplyVendorSpace";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

const MainPage = () => {
  const userType = useSelector((state: RootState) => state.user.userType);
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
