import { io } from "socket.io-client";

const URL =
  process.env.VITE_REACT_APP_API_SOCKET_IO_URL || "ttp://3.25.82.146:1234";

export const socket = io(URL);
