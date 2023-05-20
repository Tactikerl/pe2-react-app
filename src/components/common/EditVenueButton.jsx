import { useNavigate } from "react-router-dom";

const EditVenueButton = ({ venueId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/venues/${venueId}/edit`);
  };

  return <button onClick={handleEdit}>Edit Venue</button>;
};

export default EditVenueButton;
