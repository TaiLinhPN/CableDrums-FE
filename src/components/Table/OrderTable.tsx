import { Skeleton } from "antd";
import { useOrderData } from "../../hooks/useOrderData";
import MyTable from ".";
import Thead from "./Thead";
import TBody from "./TBody";
import OrderRow from "./OrderRow";

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
  const { orders, loading } = useOrderData();
  console.log(orders);

  return (
    <div>
      <MyTable>
        <Thead titles={headerTitles}></Thead>
        <TBody>
          {orders.map((order, index) => (
            <OrderRow key={order._id} no={index + 1} order={order}></OrderRow>
          ))}
        </TBody>
      </MyTable>
      {loading && (
        <div className="min-w-full mt-8 space-y-6 ">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="min-w-full mt-8 text-center">No orders found.</div>
      )}
    </div>
  );
};

export default OrderTable;
