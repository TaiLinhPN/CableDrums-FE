import { Button } from "antd";
import { useEffect, useState } from "react";
import { createOrderApi } from "../../api/orderApi";
import { messageSuccess } from "../../utils/notify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchAccountData } from "../../redux/slice/accountSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface CreateOrderFormProps {
  setModel: (isOpen: boolean) => void;
}
const CreateOrderForm = ({ setModel }: CreateOrderFormProps) => {
  const dispatch = useDispatch();

  const { contractToCreateOrder } = useSelector(
    (state: RootState) => state.contract
  );
  const {
    accounts,
    isSet,
    isLoading: accountIsLoading,
  } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    fetchAccountData()(dispatch, isSet);
  }, []);

  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isLoadingCreateOrder, setLoadingCreateOrder] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const projectContractors = accounts.filter(
    (user) => user.userType === "projectContractor"
  );

  const availableCable =
    (contractToCreateOrder.cableDrumCount as number) -
    (((contractToCreateOrder.cableDelivered as number) +
      contractToCreateOrder.cableRequired) as number);

  useEffect(() => {
    if (selectedContractor !== "" && selectedNumber !== "") {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [selectedContractor, selectedNumber]);

  const handleCreateOrder = async () => {
    try {
      setButtonDisabled(true);
      setLoadingCreateOrder(true);
      const response = await createOrderApi({
        contractId: contractToCreateOrder._id,
        projectContractorId: selectedContractor,
        cableDrumsToWithdraw: selectedNumber,
      });
      if (response.status === 201) {
        setModel(false);
        messageSuccess(response.data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="contractorSelect">
          Select Project Contractor:
          <span> {accountIsLoading && <Spin indicator={antIcon} />}</span>
        </label>

        <select
          id="contractorSelect"
          value={selectedContractor}
          onChange={(e) => setSelectedContractor(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">
            {accountIsLoading ? "Loading..." : "Select a contractor..."}
            {!accountIsLoading &&
              accounts.length === 0 &&
              "No orders any contractor."}
          </option>

          {projectContractors.map((contractor) => (
            <option key={contractor._id} value={contractor._id}>
              {contractor.username}
            </option>
          ))}
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
      <Button
        loading={isLoadingCreateOrder}
        className="absolute bottom-1"
        onClick={handleCreateOrder}
        disabled={isButtonDisabled}
      >
        Create order
      </Button>
    </div>
  );
};

export default CreateOrderForm;
