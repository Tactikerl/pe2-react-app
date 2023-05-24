import { useState } from "react";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: userName,
      email: email,
      password: password,
    };

    try {
      const res = await fetch(
        "https://nf-api.onrender.com/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!res.ok) {
        throw Error(`HTTP error! status: ${res.status}`);
      }

      console.log("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container-fluid justify-content-center row">
      <form
        onSubmit={handleSubmit}
        className="col-md-6 d-flex bg-info-subtle flex-column justify-content-center"
      >
        <h3>User Register</h3>
        <label htmlFor="userName" className="form-label">
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your user name"
            className="form-control"
          />
        </label>
        <label htmlFor="email" className="form-label">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="form-control"
          />
        </label>
        <label htmlFor="password" className="form-label">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="form-control"
          />
        </label>
        <div className="form-check">
          <label htmlFor="admin" className="form-check-label">
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
        <button type="submit" className="btn bg-warning-subtle">
          Register
        </button>
      </form>
      <div className="col-md-6 bg-login-register"></div>
    </div>
  );
};

export default UserRegister;
