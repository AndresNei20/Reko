import PropTypes from 'prop-types';

const CheckboxGroup = ({ label, options, selectedValues, onChange }) => {
  return (
    <div>
      <h4>{label}</h4>
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

CheckboxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default CheckboxGroup;
