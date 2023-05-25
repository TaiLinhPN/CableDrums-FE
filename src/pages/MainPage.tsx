
// function MainPage() {
//   return (
//     <div className="content">
//       hello would
//     </div>
//   );
// }

// export default MainPage;

import { useEffect, useState } from "react";

interface Account {
  username: string;
  email: string;
  userType: string;
}

const AccountTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Fetch the account data from the API and update the accounts state
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/user/get-all");
        const data = await response.json();
        setAccounts(data); // Assuming the API response is an array of account objects
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NO.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.map((account, index) => (
            <tr key={account.username} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{account.userType}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;