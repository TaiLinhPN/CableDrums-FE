import { Button, Result } from "antd";
import { clearAllStorage } from "../utils/storage";
import { useNavigate } from "react-router-dom";


const NotFoundAccountPage = () => {
  const navigate = useNavigate()
    const handleLogOut = () => {
      navigate("/login");
      clearAllStorage();
      window.location.reload();
    };
  return (
    <div className="flex items-center justify-center h-screen container">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something was wrong."
        extra={<Button onClick={handleLogOut}>Login again</Button>}
      />
    </div>
  );
};

export default NotFoundAccountPage;
