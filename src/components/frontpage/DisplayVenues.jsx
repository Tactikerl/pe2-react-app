import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Rating from "../common/Rating";
import "../../../src/custom.scss";
import Facilities from "../common/Facilities";
import VenueAttributes from "../common/VenueAttributes";

function DisplayVenues(props) {
  return (
    <Link className="text-decoration-none" to={`/venues/${props.id}`}>
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
                <Col lg={9} className="bg-info-subtle ">
                  <div style={{ fontSize: "14px" }}>
                    <VenueAttributes
                      owner={props.owner}
                      location={props.location}
                      maxGuests={props.maxGuests}
                      price={props.price}
                      inactive={{
                        host: true,
                        address: true,
                      }}
                    />
                  </div>

                  <Card.Text className="multi-line-ellipsis">
                    {props.description}
                  </Card.Text>
                </Col>
                <Col
                  lg={3}
                  className="bg-info-subtle d-flex justify-content-end"
                >
                  <Facilities meta={props.meta} column={true} />
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
