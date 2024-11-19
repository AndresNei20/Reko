import PropTypes from 'prop-types'

export const Question4 = ({ responses, onChange }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">{"What's the minimum rating you prefer?"}</h2>
      <div className="flex justify-center">
        <input
          type="number"
          min="1"
          max="10"
          value={responses.calificacion_minima}
          onChange={(e) => onChange("calificacion_minima", e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-center text-white"
          placeholder="Enter a number (1-10)"
        />
      </div>
    </div>
  );
};

Question4.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}