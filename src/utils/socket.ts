import { io } from "socket.io-client";

const URL = process.env.VITE_REACT_APP_API_SOCKET_IO_URL || "http://localhost:1234";

export const socket = io(URL);
