import { useState } from "react";
import { Button } from "react-bootstrap";
import { API_FETCH_VENUE } from "../utils/url";

const DeleteVenue = ({ id }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${API_FETCH_VENUE}${id}`, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to delete the venue.");
      }

      setIsDeleted(true);

      alert("Venue deleted successfully");
      window.location.href = "/";
    } catch (error) {
      setError("An error occurred while deleting the venue.");
      console.error("Error deleting venue:", error);
    }
  };

  if (isDeleted) {
    return <p>Venue deleted successfully.</p>;
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Button variant="danger" className="bg-red" onClick={handleDelete}>
        Delete Your Venue
      </Button>
    </div>
  );
};

export default DeleteVenue;
