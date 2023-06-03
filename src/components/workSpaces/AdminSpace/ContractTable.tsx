import { Skeleton } from "antd";
import { useContractData } from "../../../hooks/useContractData";
const headerTitles = [
  "NO.",
  "Contract ID",
  "Supply Vendor",
  "Cable Drum Count",
  "Cable Drum Delivered",
  "Created at",
  "Expires at",
];

const ContractTable = () => {
  const { contracts } = useContractData();
  console.log(contracts);

  return (
    <div>
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

        <tbody className="bg-white divide-y divide-gray-200 min-w-full">
          {contracts.map((contract, index) => (
            <tr key={contract._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{contract._id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">
                  {contract.supplyVendor.username}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">
                  {contract.cableDrumCount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">
                  {contract.cableDelivered}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{contract.createAt}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{contract.expireAt}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {contracts.length === 0 && (
        <div className="min-w-full mt-8 space-y-6 ">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </div>
  );
};

export default ContractTable;
