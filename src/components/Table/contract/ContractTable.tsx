import MyTable from "..";
import Thead from "../Thead";
import TBody from "../TBody";
import ContractRow from "./ContractRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  Contract,
  fetchContractData,
} from "../../../redux/slice/contractSlice";
import SearchBox, { find } from "../../Search";
import Loading from "../../Loading";

const ContractTable = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState<Contract[]>();
  const { contracts, isLoading, isSet } = useSelector(
    (state: RootState) => state.contract
  );
  const userType = useSelector((state: RootState) => state.user.userType);

  useEffect(() => {
    fetchContractData()(dispatch, isSet);
  }, []);

  const onSearch = (value: string) => {
    const result = find(contracts, value);
    setSearchData(result);
  };

  let headerTitles = [
    "NO.",
    "Contract",
    "Supply Vendor",
    "Count / Delivered / Requested",
    "Created / Expires at",
  ];
  if (userType === "planner") {
    headerTitles.push("Handle");
  }
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

          <TBody>
            {(searchData || contracts).map((contract, index) => (
              <ContractRow
                key={contract._id}
                no={index + 1}
                contract={contract}
              ></ContractRow>
            ))}
          </TBody>
        </MyTable>

        <Loading
          isLoading={isLoading}
          dataLength={contracts.length}
          text="No contract found."
        />
      </div>
    </div>
  );
};

export default ContractTable;
