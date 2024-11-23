import PropTypes from 'prop-types'
import movieImg from '../assets/movie.png'
import serieImg from '../assets/serie.png'
import CheckboxImage from './CheckboxImage';


export const Question3 = ({ responses, onChange }) => {
  const options = ["movie", "tv"];
  

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h2 className="flex text-2xl font-light mb-2">Select your favorite format</h2>
      <h2 className="flex text-xl font-extralight mb-20">Your have to select one</h2>
      <div className="flex items-center space-x-24">
        {options.map((option) => (
          <CheckboxImage
            key={option} 
            type="radio"
            value={option.toLowerCase()}
            checked={responses.formato === option.toLowerCase()}
            onChange={(e) => onChange("formato", e.target.value)}
            imageSrc={option == 'movie' ? movieImg : serieImg}
            name={option == 'movie' ? 'Movies' : 'Series'}
            altText="Prime Video"
          />
        
        ))}
      </div>
    </div>
  );
};

Question3.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}