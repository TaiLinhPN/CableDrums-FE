import { useEffect, useState } from "react";
import Td from "../Td";
import { Button, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateOrderApi } from "../../../api/orderApi";
import { messageError, messageSuccess } from "../../../utils/notify";
import { Order } from "../../../redux/slice/orderSlice";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
interface RequestRowProps {
  order: Order;
  no: number;
}
const RequestRow = ({ order, no }: RequestRowProps) => {
  const { userType } = useSelector((state: RootState) => state.user);
  const { orders } = useSelector((state: RootState) => state.order);
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
      setLoading(true);
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
  const confirm = () => {};

  return (
    <tr key={order._id} className="hover:bg-gray-100">
      <Td>{no}</Td>
      <Td>{order.orderName}</Td>
      <Td>
        <Popconfirm
          className="contract-id"
          placement="topLeft"
          title={`Contract id: ${order.contract._id}`}
          description={`Go to contract details`}
          onConfirm={confirm}
          okText="Go"
        >
          <p className="truncate w-20">{order.contract.contractName}</p>
        </Popconfirm>
      </Td>
      <Td>{order.planner.username}</Td>
      <Td>{order.supplyVendor.username}</Td>
      <Td>{order.projectContractor.username}</Td>
      <Td>{order.cableDrumsToWithdraw}</Td>
      <Td>{order.status}</Td>
      {(userType === "supplyVendor" || userType === "projectContractor") && (
        <Td>
          <Button
            disabled={isDisabled}
            loading={isLoading}
            onClick={handleUpdate}
          >
            {buttonLabel}
          </Button>
        </Td>
      )}
      <Td>
        <div className="relative space-y-2">
          {notesToShow.map((note, index) => (
            <div
              key={index}
              className={`text-left   w-52 ${
                showAllNotes && "bg-pale-silver p-1 rounded-md"
              }`}
            >
              <p>{note.time}</p>
              <p className=" whitespace-pre-wrap  break-words">
                {note.username}
              </p>
              {note.message && <p>Note: {note.message}</p>}
            </div>
          ))}

          {order.notes.length > 1 && (
            <button
              onClick={toggleShowAllNotes}
              className="absolute top-0 right-0"
            >
              {showAllNotes ? (
                <FiChevronUp size={"1.5em"} />
              ) : (
                <FiChevronDown size={"1.5em"} />
              )}
            </button>
          )}
        </div>
      </Td>
    </tr>
  );
};

export default RequestRow;
