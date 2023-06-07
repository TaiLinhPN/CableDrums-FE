import { ReactNode, useState } from "react";
import Td from "./Td";
import { Button, Modal } from "antd";
import CreateOrderForm from "../workSpaces/PlannerSpace/CreateOrderForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Contract,
  setContractToCreateOrder,
} from "../../redux/slice/ContractSlice";

interface AccountRowProps {
  children?: ReactNode;
  contract: Contract;
  no: number;
}
const ContractRow = ({ contract, no, children }: AccountRowProps) => {
  const dispatch = useDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleCreateOrder = () => {
    dispatch(setContractToCreateOrder(contract));
    setOpenModalCreate(true);
  };
  return (
    <tr className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{contract.supplyVendor.username}</Td>
      <Td>{contract.cableDrumCount}</Td>
      <Td>{contract.cableDelivered}</Td>
      <Td>{contract.cableRequired}</Td>
      <Td>{contract.createAt}</Td>
      <Td>{contract.expireAt}</Td>
      <Td>
        {userType === "planner" && (
          <Button
            disabled={
              contract.cableDrumCount <=
              contract.cableDelivered + contract.cableRequired
            }
            onClick={handleCreateOrder}
          >
            create order
          </Button>
        )}

        {/* <Button>Contract Details</Button> */}
      </Td>
      {children}

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
