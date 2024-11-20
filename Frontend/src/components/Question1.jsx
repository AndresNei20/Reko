import PropTypes from 'prop-types';
import primeImg from '../assets/prime-icon.jpg';
import netflixImg from '../assets/netflix-icon.png';
import hboImg from '../assets/hbo-icon.png';
import CheckboxImage from './CheckboxImage'; 

export const Question1 = ({ responses, onChange }) => {

  const handleCheckboxChange = (platform, isChecked) => {
    onChange(
      "plataformas",
      isChecked
        ? [...responses.plataformas, platform]
        : responses.plataformas.filter((p) => p !== platform)
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-medium mb-10">Select your favorite platforms</h2>
      <div className="flex flex-wrap justify-center space-x-10">
        <CheckboxImage
          value="Netflix"
          checked={responses.plataformas.includes("Netflix")}
          onChange={(e) => handleCheckboxChange("Netflix", e.target.checked)}
          imageSrc={netflixImg}
          altText="Netflix"
        />
        <CheckboxImage
          value="Prime"
          checked={responses.plataformas.includes("Prime")}
          onChange={(e) => handleCheckboxChange("Prime", e.target.checked)}
          imageSrc={primeImg}
          altText="Prime Video"
        />
        <CheckboxImage
          value="HBO"
          checked={responses.plataformas.includes("HBO")}
          onChange={(e) => handleCheckboxChange("HBO", e.target.checked)}
          imageSrc={hboImg}
          altText="HBO"
        />
      </div>
    </div>
  );
};

Question1.propTypes = {
  responses: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
