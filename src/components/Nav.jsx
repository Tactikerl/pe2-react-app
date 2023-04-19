import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-wrapper">
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-menu-item">
          <Link to="">Login/Register</Link>
        </li>
      </ul>
    </div>
  );
};
