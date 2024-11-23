import PropTypes from 'prop-types'
import CheckboxImage from './CheckboxImage';
import { genres } from '../services/genresImgs';

export const Question2 = ({ responses, onChange }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="flex text-2xl font-light mb-2">Select your favorites genres</h2>
      <h2 className="flex text-xl font-extralight mb-20">Your can select one or more genres</h2>
      <div className="flex flex-wrap justify-center space-x-4 space-y-2">
        {genres.map((genre) => (
  
          <CheckboxImage
            key={genre.value}
            value={genre.value}
            type="checkbox"
            altText={genre.value}
            imageSrc={genre.img}
            checked={responses.generos.includes(genre.value)}
            onChange={(e) =>
              onChange(
                "generos",
                e.target.checked
                  ? [...responses.generos, genre.value]
                  : responses.generos.filter((g) => g !== genre.value)
              )
            }
          />
          
        ))}
      </div>
    </div>
  );
};

Question2.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}