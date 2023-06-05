import { Button, Modal, Skeleton } from "antd";
import { Account, useAccountsData } from "../../hooks/useAccountsData";
import { useState } from "react";
import CreateUserForm from "../User/CreateUserForm";
import RemoveUserForm from "../User/RemoveUserForm";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import Td from "./Td";
import AccountRow from "./AccountRow";

const headerTitles = ["NO.", "Username", "Email", "User Type", "Handle"];

const AccountTable = () => {
  const { accounts } = useAccountsData();
  const [user, setUser] = useState<Account>({
    _id: "",
    username: "",
    userType: "",
    email: "",
  });
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);
  const handleDelete = (id: string) => {
    const user = accounts.find((acc: Account) => acc._id === id);
    setUser(user as Account);

    setOpenModalRemove(!openModalRemove);
  };

  return (
    <div>
      <div>
        <Button onClick={() => setOpenModalCreate(true)}>Create</Button>

        <MyTable>
          <Thead titles={headerTitles}></Thead>
          <TBody>
            {accounts.map((account, index) => (
              <AccountRow no={index} account={account}>
                <Td>
                  <button
                    onClick={() => handleDelete(account._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </Td>
              </AccountRow>
            ))}
          </TBody>
        </MyTable>
        {accounts.length === 0 && (
          <div className="mt-8 ">
            <Skeleton active />
          </div>
        )}
      </div>

      {
        <Modal
          centered
          open={openModalCreate}
          onCancel={() => setOpenModalCreate(false)}
          width={400}
        >
          <CreateUserForm setModel={setOpenModalCreate} />
        </Modal>
      }

      {openModalRemove && (
        <Modal
          centered
          open={openModalRemove}
          onCancel={() => setOpenModalRemove(false)}
          width={300}
        >
          <RemoveUserForm setModel={setOpenModalRemove} user={user} />
        </Modal>
      )}
    </div>
  );
};

export default AccountTable;
