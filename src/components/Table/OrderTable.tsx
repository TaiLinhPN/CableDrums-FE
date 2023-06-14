import { Skeleton } from "antd";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import OrderRow from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Order, fetchOrderData } from "../../redux/slice/orderSlice";
import SearchBox, { find } from "../Search";

const headerTitles = [
  "NO.",
  "Contract Id",
  "Planner",
  "Supply Vendor",
  "Project Contractor",
  "cable Requested",
  "Current Status",
  "Handle",
  "Note",
];
const OrderTable = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState<Order[]>();
  const { orders, isLoading, isSet } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    fetchOrderData()(dispatch, isSet);
  }, []);
  const onSearch = (value: string) => {
    const result = find(orders, value);
    setSearchData(result);
    console.log(result);
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
              {searchData.map((order, index) => (
                <OrderRow
                  key={order._id}
                  no={index + 1}
                  order={order}
                ></OrderRow>
              ))}
            </TBody>
          ) : (
            <TBody>
              {orders.map((order, index) => (
                <OrderRow
                  key={order._id}
                  no={index + 1}
                  order={order}
                ></OrderRow>
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

        {!isLoading && orders.length === 0 && (
          <div className="min-w-full mt-8 text-center">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
