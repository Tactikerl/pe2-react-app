import { useState, useEffect } from "react";
import { API_LOGIN } from "../utils/url";
import { Button } from "react-bootstrap";
import { handlingServerError } from "../utils/API";

import "../../../src/custom.scss";

const UserLogin = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = title;
  }, []);

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
        await handlingServerError(res);
      }
      const json = await res.json();

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
    <div className="container-fluid justify-content-center row g-0">
      <form
        onSubmit={handleLogin}
        className="col-md-6 d-flex bg-main flex-column justify-content-center px-5"
      >
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
        <Button type="submit" variant="success" className="bg-green">
          Login
        </Button>
      </form>
      <div className="col-md-6 bg-login-register"></div>
    </div>
  );
};

export default UserLogin;
