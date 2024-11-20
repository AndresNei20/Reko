import PropTypes from 'prop-types'

export const Question3 = ({ responses, onChange }) => {
  const options = ["movie", "show"];

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">What format do you prefer?</h2>
      <div className="flex flex-col items-center space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name="format"
              value={option.toLowerCase()}
              checked={responses.formato === option.toLowerCase()}
              onChange={(e) => onChange("formato", e.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

Question3.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}