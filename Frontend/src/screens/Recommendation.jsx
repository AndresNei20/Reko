import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'


export const Recommendation = ({ recommendations }) => {
  return (
    <div className="flex flex-col items-center text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Your Movie Recommendations</h1>

      {recommendations && recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={rec.posterUrl || "https://via.placeholder.com/150"}
                alt={rec.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{rec.title}</h2>
              <p className="text-gray-500">{rec.releaseYear}</p>
              <p className="mt-2">{rec.description || "No description available."}</p>
              <a
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-red-800 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Watch Now
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No recommendations available at the moment.</p>
      )}

      <NavLink to="/" className="mt-6 text-red-700 underline">
        Back to Home
      </NavLink>
    </div>
  );
};

Recommendation.propTypes = {
    recommendations: PropTypes.array.isRequired,
  }