import { useNavigate } from "react-router-dom";

const EditVenueButton = ({ id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/venues/${id}/edit`);
  };

  return (
    <div>
      <button className="btn bg-yellow" onClick={handleEdit}>
        Edit Your Venue
      </button>
    </div>
  );
};

export default EditVenueButton;
