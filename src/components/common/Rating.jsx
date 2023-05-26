const Rating = ({ rating, size }) => {
  return (
    <div className="d-flex">
      {Array(Math.round(rating))
        .fill("")
        .map((x, index) => (
          <div
            className=" rounded p-1  bg-light mb-2 me-1"
            style={{ lineHeight: 0 }}
            key={index}
          >
            <svg
              style={{ display: "block", float: "left" }}
              xmlns="http://www.w3.org/2000/svg"
              width={size || 20}
              height={size || 20}
              viewBox="0 0 24 24"
              fill="#e8b923"
              stroke="#e8b923"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        ))}
    </div>
  );
};

export default Rating;
