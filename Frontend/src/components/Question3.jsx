import PropTypes from 'prop-types'
import movieImg from '../assets/action.png'
import serieImg from '../assets/series.png'
import CheckboxImage from './CheckboxImage';


export const Question3 = ({ responses, onChange }) => {
  const options = ["movie", "tv"];
  

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-20">What format do you prefer?</h2>
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