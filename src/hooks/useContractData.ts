import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { getAllContractApi } from "../api/contractApi";

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
  const [contracts, setContracts] = useState<Contract[]>([]);
  const fetchContact = async () => {
    const response = await getAllContractApi();
    if (response.status === 201) {
      setContracts(response.data.data);
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
