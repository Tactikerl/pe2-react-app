import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { loginUser } from "../utils/API";
import "../../../src/custom.scss";

const UserLogin = ({ title }) => {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const json = await loginUser(userEmail, password);

      const { name, email, accessToken, venueManager } = json;

      sessionStorage.setItem("username", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("isManager", venueManager);

      console.log("User successfully logged inn!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging inn:", error);
    }
  };

  return (
    <div className="row h-100">
      <form
        onSubmit={handleLogin}
        className="col-md-6 d-flex bg-main flex-column justify-content-center px-5"
      >
        <h1>Login to Holidaze</h1>
        <label htmlFor="Email" className="form-label">
          Email:
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </label>
        <label htmlFor="Password" className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </label>
        <Button type="submit" variant="success" className="bg-green">
          Login
        </Button>
      </form>
      <div className="col-md-6 bg-login-register"></div>
    </div>
  );
};

export default UserLogin;
