import breakfast from "../../assets/icons/breakfast.svg";
import pets from "../../assets/icons/pawprint.png";
import parking from "../../assets/icons/parking.svg";
import wifi from "../../assets/icons/wifi.svg";
import { Badge } from "react-bootstrap";
const icons = {
  breakfast,
  pets,
  parking,
  wifi,
};
const Facilities = ({ meta, size, column }) => {
  return (
    <div
      className={
        column
          ? "d-flex flex-wrap d-lg-inline-grid align-content-start gap-2"
          : "d-flex flex-wrap gap-2"
      }
    >
      {Object.keys(meta || {}).map((key) =>
        meta[key] ? (
          <Badge
            bg="info"
            className="fs-6 text-bg-info d-inline-flex align-items-center"
            key={key}
          >
            {
              <img
                height={size || 20}
                width={size || 20}
                src={icons[key]}
                className="me-1"
              ></img>
            }
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Badge>
        ) : null
      )}
    </div>
  );
};

export default Facilities;
