
import { ReactNode } from "react";
import Td from "./Td";
import { Account } from "../../redux/slice/accountSlice";

interface AccountRowProps {
  children?: ReactNode;
  account: Account;
  no: number;
}

const AccountRow = ({ account, no, children }: AccountRowProps) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{account.username}</Td>
      <Td>{account.email}</Td>
      <Td>{account.userType}</Td>
      {children}
    </tr>
  );
};

export default AccountRow;
