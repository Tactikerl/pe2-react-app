import Logo from "../header/Logo";
import Navbar from "../header/Nav";
import "../../../src/custom.scss";
import Footer from "./Footer";
import UserIcon from "./UserIcon";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="bg-blue  ">
        <div className="container justify-content-center">
          <div className="row g-0">
            <div className="col-md-2">
              <Navbar />
            </div>
            <div className="col-md-8 d-flex justify-content-center ">
              <Logo />
            </div>
            <div className="col-md-2 d-flex justify-content-end">
              <UserIcon />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow-1 d-flex">
        <div className="container justify-content-center">{children}</div>
      </main>
      <footer className="bg-blue d-flex justify-content-center align-items-center">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
