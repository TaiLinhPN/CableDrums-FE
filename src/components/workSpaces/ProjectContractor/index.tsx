import { useState } from "react";
import SideBar from "../../SideBar";
import ContractTable from "../../Table/ContractTable";
import OrderTable from "../../Table/OrderTable";

const ProjectContractorSpace = () => {
  const [selectedTable, setSelectedTable] = useState(1);
  const handleButtonClick = (tableNumber: number) => {
    setSelectedTable(tableNumber);
  };

  return (
    <div className="flex flex-grow">
      <SideBar>
        <div className="flex flex-col">
          <button
            onClick={() => handleButtonClick(1)}
            className={`${
              selectedTable === 1 ? "bg-stone-500 text-white" : "bg-gray-200"
            } px-4 py-2`}
          >
            Contract
          </button>

          <button
            onClick={() => handleButtonClick(2)}
            className={`${
              selectedTable === 2 ? "bg-stone-500 text-white" : "bg-gray-200"
            } px-4 py-2 `}
          >
            Order
          </button>
        </div>
      </SideBar>
      <div className="container mx-auto p-4">
        {selectedTable === 1 && <ContractTable />}
        {selectedTable === 2 && <OrderTable />}
      </div>
    </div>
  );
};

export default ProjectContractorSpace;
