import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { getAllContractApi } from "../api/contractApi";
import { useDispatch } from "react-redux";
import { setContractData } from "../redux/slice/dataSlice";

export interface Contract {
  _id: string;
  supplyVendor: {
    _id: string;
    username: string;
  };
  cableDrumCount: number;
  cableDelivered: number;
  cableRequired: number;
  expireAt: string;
  createAt: string;
}
export function useContractData() {
  const dispatch = useDispatch();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const fetchContact = async () => {
    const response = await getAllContractApi();
    if (response.status === 201) {
      setContracts(response.data.data);
      dispatch(setContractData(response.data.data));
    }
  };
  useEffect(() => {
    socket.on("new-contract", (data) => {
      console.log(data);
      setContracts((contracts) => [data, ...contracts]);
    });
  }, []);

  useEffect(() => {
    fetchContact();
  }, []);

  return { contracts, setContracts };
}
