import github from "../../assets/icons/github.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import twitter from "../../assets/icons/twitter.svg";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";

const Footer = () => {
  return (
    <div className="container d-flex justify-content-center mt-2 mb-2 gap-3">
      <div>
        <img src={linkedin} alt="" />
      </div>
      <div>
        <img src={github} alt="" />
      </div>
      <div>
        <img src={twitter} alt="" />
      </div>
      <div>
        <img src={facebook} alt="" />
      </div>
      <div>
        <img src={instagram} alt="" />
      </div>
    </div>
  );
};

export default Footer;
