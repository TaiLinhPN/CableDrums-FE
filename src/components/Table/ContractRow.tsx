import { ReactNode } from "react";
import { Contract } from "../../hooks/useContractData";
import Td from "./Td";

interface AccountRowProps {
  children?: ReactNode;
  contract: Contract;
  no: number;
}
const ContractRow = ({ contract, no, children }: AccountRowProps) => {
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
      {children}
    </tr>
  );
};

export default ContractRow;
