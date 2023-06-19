import { Skeleton } from "antd";
import MyTable from "..";
import Thead from "../Thead";
import TBody from "../TBody";
import RequestRow from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { Order, fetchOrderData } from "../../../redux/slice/orderSlice";
import SearchBox, { find } from "../../Search";

const OrderTable = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState<Order[]>();
  const { orders, isLoading, isSet } = useSelector(
    (state: RootState) => state.order
  );
  const userType = useSelector((state: RootState) => state.user.userType);

  useEffect(() => {
    fetchOrderData()(dispatch, isSet);
  }, []);
  const onSearch = (value: string) => {
    const result = find(orders, value);
    setSearchData(result);
    console.log(result);
  };

  let headerTitles = [
    "NO.",
    "Request",
    "Contract",
    "Planner",
    "Supply Vendor",
    "Project Contractor",
    "cable Requested",
    "Current Status",
    "Handle",
    "Note",
  ];
  if (userType === "admin" || userType === "planner") {
    delete headerTitles[8];
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
            {(searchData || orders).map((order, index) => (
              <RequestRow key={order._id} no={index + 1} order={order} />
            ))}
          </TBody>
        </MyTable>
        {isLoading && (
          <div className="min-w-full mt-8 space-y-6">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div className="min-w-full mt-8 text-center">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
