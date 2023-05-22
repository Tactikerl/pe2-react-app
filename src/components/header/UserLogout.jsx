import "../../../src/custom.scss";
import { Button } from "react-bootstrap";

const UserLogout = () => {
  const handleStorageClear = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Button variant="danger" onClick={handleStorageClear}>
        Logout
      </Button>
    </div>
  );
};

export default UserLogout;
