import { Button,  } from "antd";
import { Contract,  } from "../../../hooks/useContractData";
import { useEffect, useState } from "react";
// import { useAccountsData } from "../../../hooks/useAccountsData";
import { createOrderApi } from "../../../api/orderApi";
import { messageSuccess } from "../../../utils/notify";

interface CreateOrderFormProps {
  setModel: (isOpen: boolean) => void;
  contract: Contract;
}
const CreateOrderForm = ({ setModel, contract }: CreateOrderFormProps) => {
  // const { accounts } = useAccountsData();
  console.log(contract);
const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [selectedContractor, setSelectedContractor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  // const projectContractors = accounts.filter(
  //   (user) => user.userType === "projectContractor"
  // );

  const availableCable =
    (contract.cableDrumCount as number) -
    (((contract.cableDelivered as number) + contract.cableRequired) as number);

    useEffect(() => {
      if (selectedContractor !== "" && selectedNumber !== "") {
        setButtonDisabled(false);
      } else setButtonDisabled(true);
    }, [selectedContractor, selectedNumber]);
    const handleCreateOrder = async () => {
      
    const response = await createOrderApi({
      contractId: contract._id,
      projectContractorId: selectedContractor,
      cableDrumsToWithdraw: selectedNumber,
    });
    if (response.status === 201) {
        setModel(false);
        messageSuccess(response.data.message);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="contractorSelect">
          Select Project Contractor:
        </label>
        <select
          id="contractorSelect"
          value={selectedContractor}
          onChange={(e) => setSelectedContractor(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select a contractor</option>
          {/* {projectContractors.map((contractor) => (
            <option key={contractor._id} value={contractor._id}>
              {contractor.username}
            </option>
          ))} */}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-bold" htmlFor="numberSelect">
          Select a Number:
        </label>
        <select
          id="numberSelect"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select a number</option>
          {[...Array(availableCable)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <Button  className="absolute bottom-1" onClick={handleCreateOrder} disabled={isButtonDisabled}>
        Create order
      </Button>
    </div>
  );
};

export default CreateOrderForm;
