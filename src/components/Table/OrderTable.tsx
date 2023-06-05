import { Skeleton } from "antd";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import OrderRow from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchOrderData } from "../../redux/slice/orderSlice";

const headerTitles = [
  "NO.",
  "Contract Id",
  "Planner",
  "Supply Vendor",
  "Project Contractor",
  "cable Drums Requested",
  "Current Status",
  "Expires at",
  "Notes",
];
const OrderTable = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isSet } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    fetchOrderData()(dispatch, isSet);
  }, []);

  return (
    <div>
      <MyTable>
        <Thead titles={headerTitles}></Thead>
        <TBody>
          {data.map((order, index) => (
            <OrderRow key={order._id} no={index + 1} order={order}></OrderRow>
          ))}
        </TBody>
      </MyTable>

      {isLoading && (
        <div className="min-w-full mt-8 space-y-6">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {!isLoading && data.length === 0 && (
        <div className="min-w-full mt-8 text-center">No orders found.</div>
      )}
    </div>
  );
};

export default OrderTable;
