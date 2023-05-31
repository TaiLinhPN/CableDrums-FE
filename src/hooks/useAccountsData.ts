import { useEffect, useState } from "react";
import { fetchAccountsData } from "../helpers/userHelper";
import { socket } from "../utils/socket";

export interface Account {
  _id: string;
  username: string;
  email: string;
  userType: string;
}
export function useAccountsData() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  console.log(accounts);
  useEffect(() => {
    socket.on("new-account", (data) => {
      console.log(data);
      setAccounts((accounts) => [data, ...accounts]);
    });

    
   socket.on("remove-account", (userId) => {
  setAccounts((prevAccounts) => {
    const updatedAccounts = prevAccounts.filter(
      (account) => account._id !== userId
    );
    return updatedAccounts;
  });
});
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsData = await fetchAccountsData();
      setAccounts(accountsData);
    };

    fetchAccounts();
  }, []);

  return { accounts, setAccounts };
}
