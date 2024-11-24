import PropTypes from "prop-types";

export const Movie = ({ title, releaseYear, rating, type, genre, platform }) => {
  return (
      <section className="flex flex-col items-center">
        <div className="bg-gray-950 shadow-md rounded-lg px-6 pt-8 flex flex-col items-center text-center w-56 h-80 text-white space-y-6">
          <h2 className="text-2xl font-medium text-primary-lightpink h-12 flex items-center justify-center">
            {title}
          </h2>

          <div>
            <h2 className="text-base font-extralight">{type || 'Movie/Serie'} 
            </h2>
            <p className="text-sm text-gray-500 items-center">{releaseYear}</p>
          </div>
          
          <p className="py-2 text-gray-600 text-3xl flex items-center justify-center">
            <span className="text-primary-lightpink text-5xl mr-2">{'★'} </span>
            {rating || "1.5"}
          </p>
          <p className="text-base items-center">{genre || 'Genres'}</p>

        </div>
        <h2 className='text-base font-light mt-4 bg-primary-lightpink w-fit py-1 px-3 rounded-full'>{platform || 'Platform'} </h2>
      </section>

  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  rating: PropTypes.string,
  type: PropTypes.string,
  genre: PropTypes.string,
  platform: PropTypes.string,
};