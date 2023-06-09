import { useEffect, useState } from "react";
import Td from "./Td";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateOrderApi } from "../../api/orderApi";
import { messageError, messageSuccess } from "../../utils/notify";
import { Order } from "../../redux/slice/orderSlice";

interface OrderRowProps {
  order: Order;
  no: number;
}
const OrderRow = ({ order, no }: OrderRowProps) => {
  const { userType } = useSelector((state: RootState) => state.user);
  const {orders } = useSelector((state: RootState) => state.order);
  const [isLoading, setLoading] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("Waiting");

  useEffect(() => {
    if (order.status === "completed") {
      setButtonLabel("Done");
      setIsDisabled(true);
    } else if (userType === "supplyVendor") {
      if (order.status === "newRequest") {
              setButtonLabel("Ready to Collect");
              setIsDisabled(false);
      } else {
        setButtonLabel("Waiting");
        setIsDisabled(true);
      }

    } else if (
      userType === "projectContractor" &&
      order.status === "readyForPickup"
    ) {
      setButtonLabel("Completed");
      setIsDisabled(false);
    }
  }, [orders]);

  const toggleShowAllNotes = () => {
    setShowAllNotes(!showAllNotes);
  };

  const handleUpdate = async () => {
    let statusToUpdate = "completed";
    if (userType === "supplyVendor") {
      statusToUpdate = "readyForPickup";
    }
    try {
      setLoading(true)
      const response = await updateOrderApi(
        { status: statusToUpdate },
        order._id
      );
      if (response.status === 200) {
        messageSuccess("Updated order successfully");
        setIsDisabled(true);
        setLoading(false);
      }
    } catch (error) {
       setIsDisabled(false);
       setLoading(true);
      messageError(error);
    }
  };

  const notesToShow = showAllNotes
    ? order.notes
    : [order.notes[order.notes.length - 1]];

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
        {notesToShow.map((note, index) => (
          <div key={index} className="text-left  border-b">
            <p>{note.username}</p>
            <p>Time: {note.time}</p>
            {note.message && <p>Note: {note.message}</p>}
          </div>
        ))}

        {order.notes.length > 1 && (
          <button onClick={toggleShowAllNotes} className="text-blue-500">
            {showAllNotes ? "Show Less" : "Show More"}
          </button>
        )}
      </Td>

      <Td>
        {(userType === "supplyVendor" || userType === "projectContractor") && (
          <Button
            disabled={isDisabled}
            loading={isLoading}
            onClick={handleUpdate}
          >
            {buttonLabel}
          </Button>
        )}
      </Td>
    </tr>
  );
};

export default OrderRow;
