import { useState } from "react";
import { API_LOGIN } from "../utils/url";
import { Button } from "react-bootstrap";
import "../../../src/custom.scss";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };
    try {
      const res = await fetch(`${API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (res.status !== 200) {
        throw new Error(`HTTP Error!  status: ${res.status}`);
      }
      const json = await res.json();
      console.log(json);

      const { name, email, accessToken, venueManager } = json;

      sessionStorage.setItem("username", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("isManager", venueManager);

      console.log("User successfully logged inn!");
    } catch (error) {
      console.error("Error logging inn:", error);
      console.log("Response object:", error.response);
    }
    window.location.href = "/";
  };

  return (
    <div className="container-fluid bg-secondary justify-content-center">
      <form onSubmit={handleLogin}>
        <label htmlFor="Email" className="form-label">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </label>
        <label htmlFor="Password" className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </label>
        <Button variant="success">Login</Button>
      </form>
    </div>
  );
};

export default UserLogin;
