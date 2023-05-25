import UserLogout from "./UserLogout";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  const isLoggedIn = !!sessionStorage.getItem("accessToken");
  return (
    <Nav>
      <NavDropdown title="Menu" id="nav-dropdown">
        <NavDropdown.Item href="/">Home</NavDropdown.Item>
        <NavDropdown.Divider />
        {isLoggedIn ? (
          <>
            <NavDropdown.Item href="/profiles/:name">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/NewVenue">
              Create New Venue
            </NavDropdown.Item>
            <NavDropdown.Item>
              <UserLogout />
            </NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item href="/UserLogin">Login</NavDropdown.Item>
            <NavDropdown.Item href="/UserRegister">Register</NavDropdown.Item>
          </>
        )}
      </NavDropdown>
    </Nav>
  );
};

export default Navbar;
