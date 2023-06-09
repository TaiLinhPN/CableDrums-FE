import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { messageSuccess } from "./utils/notify";
import { socket } from "./utils/socket";
import { ToastContainer } from "react-toastify";
import RouterApp from "./routes";

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
    };
  }, []);
  return (
    <div>
      <ToastContainer theme="dark" />
        <RouterApp />
     </div>
  );
}

export default App;
