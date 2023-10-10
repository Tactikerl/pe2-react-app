import "../../../src/custom.scss";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const UserLogout = () => {
  const { clearUser } = useContext(UserContext);
  const handleStorageClear = () => {
    clearUser();
    window.location.href = "/";
  };

  return (
    <div>
      <Button variant="danger" className="bg-red" onClick={handleStorageClear}>
        Logout
      </Button>
    </div>
  );
};

export default UserLogout;
