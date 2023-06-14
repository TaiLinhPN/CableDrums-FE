import { Account } from "../../redux/slice/accountSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
const colors = [
  "bg-bazaar",
  "bg-yellow-red",
  "bg-pale-silver",
  "bg-royal-brown",
];

const countUserTypes = (users: Account[]) => {
  const counts = {
    admin: 0,
    planner: 0,
    supplyVendor: 0,
    projectContractor: 0,
  };

  for (const user of users) {
    if (user.userType === "admin") {
      counts.admin++;
    } else if (user.userType === "planner") {
      counts.planner++;
    } else if (user.userType === "supplyVendor") {
      counts.supplyVendor++;
    } else if (user.userType === "projectContractor") {
      counts.projectContractor++;
    }
  }

  const result = [
    { userType: "Admin", count: counts.admin },
    { userType: "Planner", count: counts.planner },
    { userType: "Supply Vendor", count: counts.supplyVendor },
    { userType: "Project Contractor", count: counts.projectContractor },
  ];

  return result;
};
const AccountChart = () => {
  const { accounts } = useSelector((state: RootState) => state.account);
  const [accountData, setAccountData] = useState<
    {
      userType: string;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    setAccountData(countUserTypes(accounts));
  }, [accounts]);

  return (
    <div className="shadow p-4 rounded-lg bg-white h-min ">
      <div className="md:flex md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-bold leading-tight">User Account</h2>
          <p className=" text-sm">
            Total number of accounts: {accounts.length}
          </p>
        </div>
      </div>
      <div className="mt-7  relative">
        <div className="flex  items-end mb-2 justify-center">
          {accountData.map((data: any, index: number) => (
            <div className="px-2 w-12" key={index}>
              <div
                style={{ height: `${data.count * 10}px` }}
                className={`transition ease-in  duration-200 ${
                  colors[index % colors.length]
                } hover:bg-gray-300 relative`}
              >
                <div className="text-center w-full absolute top-0 -mt-6 text-sm">
                  {data.count}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {accountData.map((data, index) => (
            <div className=" flex items-center" key={index}>
              <div
                className={`w-4 h-2 ${colors[index % colors.length]} mr-2`}
              ></div>
              <div className="text-xs">{data.userType}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountChart;
