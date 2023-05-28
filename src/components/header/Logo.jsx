import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="logo">
      <Link className="text-decoration-none" to={"/"}>
        {" "}
        <h1 className="logo-text">Holidaze</h1>
      </Link>
    </div>
  );
};

export default Logo;
