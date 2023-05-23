import Logo from "../header/Logo";
import Navbar from "../header/Nav";
import "../../../src/custom.scss";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="container layout-container">
      <header className="container row g-0">
        <div className="col-md-2">
          <Navbar />
        </div>
        <div className="col-md-8 d-flex justify-content-center ">
          <Logo />
        </div>
        <div className="col-md-2 d-flex justify-content-end">User</div>
      </header>
      <main className="flex-grow-1 d-flex">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
