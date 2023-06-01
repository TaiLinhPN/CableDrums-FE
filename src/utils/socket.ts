import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:1234";

export const socket = io(URL);
