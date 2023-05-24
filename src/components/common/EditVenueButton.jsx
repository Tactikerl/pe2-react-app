import { useNavigate } from "react-router-dom";

const EditVenueButton = ({ venueId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/venues/${venueId}/edit`);
  };

  return (
    <div>
      <button className="btn btn-warning " onClick={handleEdit}>
        Edit Your Venue
      </button>
    </div>
  );
};

export default EditVenueButton;
