
import { ReactNode } from "react";
import Td from "./Td";
import { Account, setOpenModalRemove, setReadyToRemoveAccount } from "../../redux/slice/accountSlice";
import { Button } from "antd";
import { useDispatch } from "react-redux";

interface AccountRowProps {
  children?: ReactNode;
  account: Account;
  no: number;
}

const AccountRow = ({ account, no, children }: AccountRowProps) => {
  const dispatch = useDispatch();
    const handleDelete = () => {
      dispatch(setReadyToRemoveAccount(account));
      dispatch(setOpenModalRemove(true));
    };
  return (
    <tr className="hover:bg-gray-100 ">
      <Td>{no}</Td>
      <Td style="font-medium">{account.username}</Td>
      <Td>{account.email}</Td>
      <Td>{account.userType}</Td>
      <Td>
        <Button onClick={() => handleDelete()}>Remove</Button>
      </Td>
      {children}
    </tr>
  );
};

export default AccountRow;
