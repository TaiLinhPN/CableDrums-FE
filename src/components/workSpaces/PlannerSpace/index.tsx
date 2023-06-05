import { useState } from "react";
import SideBar from "../../SideBar";
import ContractTable from "../../Table/ContractTable";
import OrderTable from "../../Table/OrderTable";


const PlannerSpace = () => {
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
      <div className="w-full">
        {/* <div className="h-24 bg-neutral-400 flex items-center px-10">
          <Button onClick={() => setOpenModalCreate(true)}>Create Order</Button>
        </div> */}
        <div className="  p-4">
          {selectedTable === 1 && <ContractTable />}
          {selectedTable === 2 && <OrderTable />}
        </div>
      </div>


    </div>
  );
};

export default PlannerSpace;
