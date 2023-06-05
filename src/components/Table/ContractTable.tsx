import { Skeleton } from "antd";
import { useContractData } from "../../hooks/useContractData";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import ContractRow from "./ContractRow";
const headerTitles = [
  "NO.",
  // "Contract ID",
  "Supply Vendor",
  "Cable Drum Count",
  "Cable Drum Delivered",
  "Cable Drum Requested",
  "Created at",
  "Expires at",
];

const ContractTable = () => {
  const { contracts } = useContractData();

  return (
    <div>
      <MyTable>
        <Thead titles={headerTitles}></Thead>
        <TBody>
          {contracts.map((contract, index) => (
            <ContractRow
              key={contract._id}
              no={index + 1}
              contract={contract}
            ></ContractRow>
          ))}
        </TBody>
      </MyTable>
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
