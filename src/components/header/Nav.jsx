import UserLogout from "./UserLogout";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import menu from "../../assets/icons/menu.svg";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <Nav>
      <NavDropdown title={<img src={menu} />} id="nav-dropdown">
        <NavDropdown.Item className="desc-text" href="/">
          Home
        </NavDropdown.Item>
        <NavDropdown.Divider />
        {user.accessToken ? (
          <>
            <NavDropdown.Item className="desc-text" href="/profiles/:name">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item className="desc-text" href="/NewVenue">
              Create New Venue
            </NavDropdown.Item>
            <NavDropdown.Item>
              <UserLogout />
            </NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item className="desc-text" href="/UserLogin">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item className="desc-text" href="/UserRegister">
              Register
            </NavDropdown.Item>
          </>
        )}
      </NavDropdown>
    </Nav>
  );
};

export default Navbar;
