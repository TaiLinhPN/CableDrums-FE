import { useState } from "react";
import SideBar from "../../SideBar";
import { Link, Outlet } from "react-router-dom";

const SupplyVendorSpace = () => {
    const [selectedTable, setSelectedTable] = useState(1);
    const handleButtonClick = (tableNumber: number) => {
      setSelectedTable(tableNumber);
    };
  return (
    <div className="flex flex-grow">
      <SideBar>
        <div className="flex flex-col">
          <Link
            to="contract"
            onClick={() => handleButtonClick(1)}
            className={`${
              selectedTable === 1 ? "bg-stone-500 text-white" : "bg-gray-200"
            } px-4 py-2`}
          >
            Contract
          </Link>

          <Link
            to="order"
            onClick={() => handleButtonClick(2)}
            className={`${
              selectedTable === 2 ? "bg-stone-500 text-white" : "bg-gray-200"
            } px-4 py-2 `}
          >
            Order
          </Link>
        </div>
      </SideBar>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default SupplyVendorSpace