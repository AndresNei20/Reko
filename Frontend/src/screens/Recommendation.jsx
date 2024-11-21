import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Movie } from "../components/Movie";
import fondo from '../assets/Fondo.png'

export const Recommendation = ({ recommendations }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">

      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
      
      <section className="flex flex-col relative w-full px-32 z-10 mt-24 items-center h-fit">
          <h1 className="text-4xl font-bold mb-12 mt-9 text-white ">Your Movie Recommendations</h1>

          {recommendations && recommendations.length > 0 ? (
            <div className="flex w-full space-x-6 items-center justify-center">
              {recommendations.map((rec, index) => (
                <Movie
                  key={index}
                  title={rec.title}
                  releaseYear={rec.releaseYear}
                  posterUrl={rec.posterUrl}
                  rating={rec.rating}
                  url={rec.url}
                />
              ))}
            </div>
          ) : (
            <p className="text-white-600 text-center text-xl">No recommendations available at the moment.</p>
          )}

          <NavLink to="/" className="mt-16 text-primary-lightpink underline">
            Back to Home
          </NavLink>

      </section>
      
    </div>
  );
};

Recommendation.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      posterUrl: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};