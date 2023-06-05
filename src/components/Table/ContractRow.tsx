import { ReactNode, useState } from "react";
import { Contract } from "../../hooks/useContractData";
import Td from "./Td";
import { Button, Modal } from "antd";
import CreateOrderForm from "../workSpaces/PlannerSpace/CreateOrderForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface AccountRowProps {
  children?: ReactNode;
  contract: Contract;
  no: number;
}
const ContractRow = ({ contract, no, children }: AccountRowProps) => {
  const userType = useSelector((state: RootState) => state.user.userType);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <tr className="hover:bg-gray-100">
      <Td>{no}</Td>
      {/* <Td>{contract._id}</Td> */}
      <Td>{contract.supplyVendor.username}</Td>
      <Td>{contract.cableDrumCount}</Td>
      <Td>{contract.cableDelivered}</Td>
      <Td>{contract.cableRequired}</Td>
      <Td>{contract.createAt}</Td>
      <Td>{contract.expireAt}</Td>
      <Td>
        {userType === "planner" && (
          <Button onClick={() => setOpenModalCreate(true)}>create order</Button>
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
          <CreateOrderForm contract={contract} setModel={setOpenModalCreate} />
        </Modal>
      )}
    </tr>
  );
};

export default ContractRow;
