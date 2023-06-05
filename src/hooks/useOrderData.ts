import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { getAllOrderApi } from "../api/orderApi";

export interface Order {
  supplyVendor: {
    _id: string;
    username: string;
  };
  planner: {
    _id: string;
    username: string;
  };
  projectContractor: {
    _id: string;
    username: string;
  };
  _id: string;
  contractId: string;
  cableDrumsToWithdraw: number;
  status: string;
  notes: {
    username: string;
    time: string;
    message?: string;
  }[];
  createdAt: string;
}
export function useOrderData() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("hook",orders);

  const fetchOrder = async () => {
    const response = await getAllOrderApi();
    if (response.status === 201) {
      setOrders(response.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    socket.on("new-order", (data) => {
      console.log(data);
      setOrders((orders) => [data, ... orders]);
    });
  }, []);

  useEffect(() => {
    fetchOrder();
  }, []);

  return { orders, setOrders, loading };
}
