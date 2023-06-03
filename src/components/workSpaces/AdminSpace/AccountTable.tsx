import { Button, Modal, Skeleton } from "antd";
import { Account, useAccountsData } from "../../../hooks/useAccountsData";
import { useState } from "react";
import CreateUserForm from "../../User/CreateUserForm";
import RemoveUserForm from "../../User/RemoveUserForm";

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

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {headerTitles.map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account, index) => (
              <tr key={account._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {account.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{account.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {account.userType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(account._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
