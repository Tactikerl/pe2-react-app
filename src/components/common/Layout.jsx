import Logo from "../header/Logo";
import Navbar from "../header/Nav";
import "../../../src/custom.scss";
import Footer from "./Footer";
import { Stack } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div className="container layout-container">
      <header className="container row">
        <span className="col-md-2">
          <Navbar />
        </span>
        <span className="col-md-8">
          <Logo />
        </span>
        <span className="col-md-2">User</span>
      </header>
      <main className="container-fluid flex-grow-1">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
