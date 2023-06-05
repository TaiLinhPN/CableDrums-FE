
import { ReactNode } from "react";
import { Account } from "../../hooks/useAccountsData";
import Td from "./Td";

interface AccountRowProps {
  children?: ReactNode;
  account: Account;
  no: number;
}

const AccountRow = ({ account, no, children }: AccountRowProps) => {
  return (
    <tr key={account._id} className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{account.username}</Td>
      <Td>{account.email}</Td>
      <Td>{account.userType}</Td>
      {children}
    </tr>
  );
};

export default AccountRow;
