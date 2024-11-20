import PropTypes from 'prop-types'

export const Question2 = ({ responses, onChange }) => {
  const genres = ["Comedy", "Drama", "Action", "Horror", "Romance", "Sci-Fi", "Fantasy"];

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Which genres do you prefer?</h2>
      <div className="flex flex-wrap justify-center space-x-4 space-y-2">
        {genres.map((genre) => (
          <label 
            key={genre} 
            className={`${responses.generos.includes(genre) ? "border-[3px] border-primary-lightpink" : ""} rounded-lg bg-primary-back py-2 px-4 cursor-pointer transition-all duration-300 transform hover:scale-110`}>
            <input
              type="checkbox"
              value={genre}
              className="hidden"
              checked={responses.generos.includes(genre)}
              onChange={(e) =>
                onChange(
                  "generos",
                  e.target.checked
                    ? [...responses.generos, genre]
                    : responses.generos.filter((g) => g !== genre)
                )
              }
            />
            <span className='text-lg font-light mt-2'>{genre} </span>
          </label>
          
        ))}
      </div>
    </div>
  );
};

Question2.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}