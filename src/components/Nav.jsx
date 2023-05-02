import { Link } from "react-router-dom";
import UserLogout from "./UserLogout";

const Nav = () => {
  const isLoggedIn = !!sessionStorage.getItem("accessToken");
  return (
    <div className="nav-wrapper">
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/">Home</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className="nav-menu-item">
              <UserLogout />
            </li>
            <li className="nav-menu-item">
              <Link to="./NewVenue">Create New Venue</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="./UserLogin">Login</Link>
            </li>
            <li className="nav-menu-item">
              <Link to="./UserRegister">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
