import { Button, Modal } from "antd";
import { removeUser } from "../helpers/userHelper";
import { useAccountsData } from "../hooks/useAccountsData";
import { useState } from "react";
import CreateUserForm from "../components/User/CreateUserForm";

const headerTitles = ["NO.", "Username", "Email", "User Type", "Handle"];

const AccountTable = () => {
  const { accounts } = useAccountsData();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await removeUser(id);
  };
  return (
    <div className="container mx-auto">
      <Button onClick={() => setOpen(true)}>Create</Button>
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
                <div className="text-sm text-gray-900">{index+1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{account.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{account.userType}</div>
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

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
      >
        <CreateUserForm setModel={setOpen} />
      </Modal>
    </div>
  );
};

export default AccountTable;
