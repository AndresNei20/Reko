import PropTypes from 'prop-types';

const CheckboxImage = ({ type, value, checked, onChange, imageSrc, altText, name }) => {
  return (
    <label className="flex flex-col cursor-pointer transition-all duration-300 transform hover:scale-110 justify-center text-center">
      <input
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <img
        src={imageSrc}
        alt={altText}
        className={`w-36  ${checked ? "border-[3px] border-pink-500" : ""}`}
      />
      <h2 className='text-lg font-light mt-2'>{name ? name : value} </h2>
    </label>
  );
};

CheckboxImage.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default CheckboxImage;