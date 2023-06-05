import { Order } from "../../hooks/useOrderData"
import Td from "./Td";

interface OrderRowProps {
    order: Order
    no: number
}
const OrderRow = ({ order, no }: OrderRowProps) => {
  return (
    <tr key={order._id} className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{order.contractId}</Td>
      <Td>{order.planner.username}</Td>
      <Td>{order.supplyVendor.username}</Td>
      <Td>{order.projectContractor.username}</Td>
      <Td>{order.cableDrumsToWithdraw}</Td>
      <Td>{order.status}</Td>
      <Td>{order.createdAt}</Td>
      <Td>
        {order.notes.map((note, index) => (
          <div key={index} className="text-left  border-b">
            <p>creator: {note.username}</p>
            <p>Time: {note.time}</p>
            {note.message && <p>Message: {note.message}</p>}
          </div>
        ))}
      </Td>
    </tr>
  );
};

export default OrderRow