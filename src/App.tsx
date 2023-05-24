import { useEffect } from "react";
import "./App.css";
import Router from "./routes";
import { messageSuccess } from "./utils/notifi";
import { socket } from "./utils/socket";

function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log("Connected: ", socket.connected);
    };

    const onMessage = (data: any) => {
      console.log(data);
      messageSuccess(data.data);
    };

    const OnChatMessage = (data: any) => {
      console.log(data);
      messageSuccess(data.message);
    };

    socket.on("connect", onConnect);
    socket.on("message", onMessage);
    socket.on("chat-message", OnChatMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("chat-message", OnChatMessage);
    }
  }, []);
  return <Router />;
}

export default App;
