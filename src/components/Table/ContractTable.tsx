import { Skeleton } from "antd";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import ContractRow from "./ContractRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchContractData } from "../../redux/slice/ContractSlice";
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
  const dispatch = useDispatch();
  const { contracts, isLoading, isSet } = useSelector(
    (state: RootState) => state.contract
  );
  useEffect(() => {
    fetchContractData()(dispatch, isSet);
  }, []);

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
      {isLoading && (
        <div className="min-w-full mt-8 space-y-6">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {!isLoading && contracts.length === 0 && (
        <div className="min-w-full mt-8 text-center">No contract found.</div>
      )}
    </div>
  );
};

export default ContractTable;
