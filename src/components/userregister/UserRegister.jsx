import { useState, useEffect, useRef } from "react";
import { handlingServerError } from "../utils/API";
import { API_REGISTER } from "../utils/url";
import { useNavigate } from "react-router-dom";

const UserRegister = ({ title }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const repeatPassword = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword.current.value) {
      alert("Passwords do not match!");
      return;
    }
    const userData = {
      name: userName,
      email: email,
      password: password,
      venueManager: isAdmin,
    };

    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      await handlingServerError(res);

      alert("User registered successfully!");
      console.log("User registered successfully!");
      navigate("/UserLogin");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="row h-100">
      <form
        onSubmit={handleSubmit}
        className="col-md-6 d-flex bg-main flex-column justify-content-center"
      >
        <h3>User Register</h3>
        <label className="form-label">
          <input
            aria-label="User name"
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your user name"
            className="form-control"
            required
          />
        </label>
        <label className="form-label">
          <input
            aria-label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="form-control"
            required
          />
        </label>
        <label className="form-label">
          <input
            aria-label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="form-control"
            required
          />
        </label>
        <label className="form-label">
          <input
            aria-label="Repeat password"
            type="password"
            id="repeatPassword"
            ref={repeatPassword}
            placeholder="Repeat password"
            className="form-control"
            required
          />
        </label>
        <div className="form-check">
          <label className="form-check-label">
            <input
              id="admin"
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="form-check-input"
            />
            Check box if Venue Admin
          </label>
        </div>
        <button type="submit" className="btn bg-green border-dark">
          Register
        </button>
      </form>
      <div className="col-md-6 bg-login-register"></div>
    </div>
  );
};

export default UserRegister;
