import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import "../../../src/custom.scss";

function DisplayVenues(props) {
  return (
    <Link to={`/venues/${props.id}`}>
      <Card className="m-4">
        <Row className="g-0">
          <Col md={4} className="card-image">
            {/* <Card.Img
              variant="top"
              src={props.image}
              style={{ height: "5vh", objectFit: "fill" }}
            /> */}
            <img
              src={props.image}
              className="h-100 w-100 object-fit-cover img-fluid "
              alt="..."
            ></img>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price : {props.price},- NOK</ListGroup.Item>
                <ListGroup.Item>
                  Guest Capacity : {props.maxGuests}
                </ListGroup.Item>
                <ListGroup.Item>Owner : {props.owner}</ListGroup.Item>
                <Card.Text className="multi-line-ellipsis">
                  {props.description}
                </Card.Text>
              </ListGroup>
            </Card.Body>
          </Col>
          <Col md={2}>
            <Card.Body>
              <ListGroup>Rating : {props.rating}</ListGroup>
              {Object.keys(props.meta || {}).map((key) => (
                <ListGroup key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                  {props.meta[key] ? "Yes" : "No"}
                </ListGroup>
              ))}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default DisplayVenues;
