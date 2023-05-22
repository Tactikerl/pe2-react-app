import { Link } from "react-router-dom";
import UserLogout from "./UserLogout";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

//import userprofile and set Link to profile!
const Navbar = () => {
  const isLoggedIn = !!sessionStorage.getItem("accessToken");
  return (
    <Nav>
      <NavDropdown title="Menu" id="nav-dropdown">
        <NavDropdown.Item>
          <Link to="/">Home</Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        {isLoggedIn ? (
          <>
            <NavDropdown.Item>
              <Link to="./NewVenue">Create New Venue</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <UserLogout />
            </NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item>
              <Link to="./UserLogin">Login</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="./UserRegister">Register</Link>
            </NavDropdown.Item>
          </>
        )}
      </NavDropdown>
    </Nav>
    // <div className="nav-wrapper">
    //   <ul className="nav-menu">
    //     <li className="nav-menu-item">
    //       <Link to="/">Home</Link>
    //     </li>

    //     {isLoggedIn ? (
    //       <>
    //         <li className="nav-menu-item">
    //           <UserLogout />
    //         </li>
    //         <li className="nav-menu-item">
    //           <Link to="./NewVenue">Create New Venue</Link>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <li>
    //           <Link to="./UserLogin">Login</Link>
    //         </li>
    //         <li className="nav-menu-item">
    //           <Link to="./UserRegister">Register</Link>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </div>
  );
};

export default Navbar;
