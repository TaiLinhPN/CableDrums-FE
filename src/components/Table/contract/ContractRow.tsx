import { useState } from "react";
import Td from "../Td";
import { Button, Modal } from "antd";
import CreateOrderForm from "../../Form/CreateOrderForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  Contract,
  setContractToCreateOrder,
} from "../../../redux/slice/contractSlice";

interface AccountRowProps {
  contract: Contract;
  no: number;
}
const ContractRow = ({ contract, no }: AccountRowProps) => {
  const dispatch = useDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleCreateOrder = () => {
    dispatch(setContractToCreateOrder(contract));
    setOpenModalCreate(true);
  };

  // const moveToDetail = () => {
  //   navigate("/contract/" + contract._id);
  // };
  return (
    <tr className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{contract.contractName}</Td>
      <Td>{contract.supplyVendor.username}</Td>
      <Td style="flex justify-center space-x-7">
        <div className="w-10 ">{contract.cableDrumCount}</div>
        <div className="w-10">{contract.cableDelivered}</div>
        <div className="w-10">{contract.cableRequired}</div>
      </Td>
      <Td>
        <div className="flex flex-col text-xs">
          <div>{contract.createAt}</div>
          <div>{contract.expireAt}</div>
        </div>
      </Td>
        {userType === "planner" && (
      <Td>
          <Button
            disabled={
              contract.cableDrumCount <=
              contract.cableDelivered + contract.cableRequired
            }
            onClick={handleCreateOrder}
          >
            create Request
          </Button>
        {/* <Button onClick={moveToDetail}>Detail</Button> */}
      </Td>
        )}
      {openModalCreate && (
        <Modal
          centered
          open={openModalCreate}
          onCancel={() => setOpenModalCreate(false)}
          width={300}
        >
          <CreateOrderForm setModel={setOpenModalCreate} />
        </Modal>
      )}
    </tr>
  );
};

export default ContractRow;
