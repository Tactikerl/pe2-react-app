import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function BookingModal(props) {
  console.log(props.dates);
  return (
    <>
      <Modal centered show={props.show} onHide={props.handleGoToFront}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-success-subtle">
          Your reservation has been made! Check in at{" "}
          {props.dates.startDate?.toLocaleDateString("en-US", dateOptions)} and
          check out at{" "}
          {props.dates.endDate?.toLocaleDateString("en-US", dateOptions)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleGoToFront}>
            Look at venues
          </Button>
          <Button variant="primary" onClick={props.handleReload}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
