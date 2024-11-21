import PropTypes from "prop-types";

export const Movie = ({ title, releaseYear, posterUrl, rating, url }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center w-64 h-96 text-gray-900">
      <img
        src={posterUrl || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold ">{title}</h2>
      <p className="text-gray-500">{releaseYear}</p>
      <p className="mt-2 text-gray-600">{rating || "No rating available."}</p>
    </div>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  posterUrl: PropTypes.string,
  rating: PropTypes.string,
  url: PropTypes.string,
};