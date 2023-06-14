import { Skeleton } from "antd";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import ContractRow from "./ContractRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Contract, fetchContractData } from "../../redux/slice/ContractSlice";
import SearchBox, { find } from "../Search";
const headerTitles = [
  "NO.",
  // "Contract ID",
  "Supply Vendor",
  "Count / Delivered / Requested",
  "Created / Expires at",
];

const ContractTable = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState<Contract[]>();
  const { contracts, isLoading, isSet } = useSelector(
    (state: RootState) => state.contract
  );
  useEffect(() => {
    fetchContractData()(dispatch, isSet);
  }, []);

    const onSearch = (value: string) => {
      const result = find(contracts, value);
      setSearchData(result); 
    };
  return (
    <div>
      <div className="flex justify-end mb-4">
        <SearchBox onSearch={onSearch} />
      </div>
      <div
        style={{
          maxHeight: "calc(100vh - 20vh)",
          maxWidth: "calc(100vw - 10vw)",
        }}
        className=" overflow-auto overscroll-auto relative"
      >
        <MyTable>
          <Thead titles={headerTitles}></Thead>
          {searchData ? (
            <TBody>
              {searchData.map((contract, index) => (
                <ContractRow
                  key={contract._id}
                  no={index + 1}
                  contract={contract}
                ></ContractRow>
              ))}
            </TBody>
          ) : (
            <TBody>
              {contracts.map((contract, index) => (
                <ContractRow
                  key={contract._id}
                  no={index + 1}
                  contract={contract}
                ></ContractRow>
              ))}
            </TBody>
          )}
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
    </div>
  );
};

export default ContractTable;
