import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { messageSuccess } from "./utils/notify";
import { socket } from "./utils/socket";
import { ToastContainer } from "react-toastify";
import RouterApp from "./routes";
import Interceptors from "./api/interceptors";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
// import { clearAllStorage } from "./utils/storage";

function App() {
  // const userId = useSelector((state: RootState) => state.user.userId);
 
  // const logOut = () => {
  //   socket.emit("leave", userId); // not work in this line???
  //   clearAllStorage();
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return logOut();
  //   });
  // }, []);

  
  // useEffect(() => {
  //   window.addEventListener("unload", (ev) => {
  //     ev.preventDefault();
  //     return logOut();
  //   });
  // }, []);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected: ", socket.connected);
    };
    const OnChatMessage = (data: any) => {
      console.log(data);
      messageSuccess(data.data.c);
    };

    socket.on("connect", onConnect);
    socket.on("chat-message", OnChatMessage);

    // return () => {
    //   socket.emit("leave", userId); // not work in this line???
    //   socket.off("connect", onConnect);
    //   socket.off("message", onMessage);
    //   socket.off("chat-message", OnChatMessage);
    // };
  }, []);
  return (
    <div>
      <ToastContainer theme="dark" />
      <RouterApp />
      <Interceptors />
    </div>
  );
}
export default App;