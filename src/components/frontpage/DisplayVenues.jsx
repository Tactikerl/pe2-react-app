import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../common/Rating";
import "../../../src/custom.scss";

function DisplayVenues(props) {
  return (
    <Link to={`/venues/${props.id}`}>
      <Card className="m-4">
        <Row className="g-0">
          <Col lg={4} className="card-image">
            <img
              src={props.image}
              className="h-100 w-100 object-fit-cover img-fluid "
              alt="..."
            ></img>
          </Col>
          <Col lg={8} className="bg-info-subtle">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <h1 className="fs-2">{props.name}</h1>
                <Rating size={15} rating={props.rating} />
              </div>

              <Row className="g-0">
                <Col lg={9} className="bg-info-subtle">
                  <p>Price : {props.price},- NOK</p>
                  <p>Guest Capacity : {props.maxGuests}</p>
                  <p>Owner : {props.owner}</p>
                  <Card.Text className="multi-line-ellipsis">
                    {props.description}
                  </Card.Text>
                </Col>
                <Col lg={3} className="bg-info-subtle">
                  <ListGroup></ListGroup>
                  {Object.keys(props.meta || {}).map((key) => (
                    <ListGroup key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                      {props.meta[key] ? "Yes" : "No"}
                    </ListGroup>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default DisplayVenues;
