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
    <div className="container-fluid bg-secondary justify-content-center">
      <h1>User Register</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label htmlFor="userName">
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your user name"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>
        <label htmlFor="admin">
          <input
            id="admin"
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Check box if VenueAdmin
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
