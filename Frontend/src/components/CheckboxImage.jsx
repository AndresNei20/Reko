import PropTypes from 'prop-types';

const CheckboxImage = ({ value, checked, onChange, imageSrc, altText }) => {
  return (
    <label className="cursor-pointer transition-all duration-300 transform hover:scale-110">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <img
        src={imageSrc}
        alt={altText}
        className={`w-36 h-36  ${checked ? "border-[3px] border-pink-500" : ""}`}
      />
      <h2 className='text-lg font-light mt-2'>{value} </h2>
    </label>
  );
};

CheckboxImage.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  altText: PropTypes.string.isRequired,
};

export default CheckboxImage;