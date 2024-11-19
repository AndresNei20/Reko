import PropTypes from 'prop-types'

export const Question5 = ({ responses, onChange }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">What range of years do you prefer?</h2>
      <div className="flex flex-col items-center space-y-2">
        <div>
          <label className="mr-2">From:</label>
          <input
            type="number"
            value={responses.rango_anios.desde}
            onChange={(e) =>
              onChange("rango_anios", { ...responses.rango_anios, desde: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1  text-white"
            placeholder="Start year"
          />
        </div>
        <div>
          <label className="mr-2">To:</label>
          <input
            type="number"
            value={responses.rango_anios.hasta}
            onChange={(e) =>
              onChange("rango_anios", { ...responses.rango_anios, hasta: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 text-white"
            placeholder="End year"
          />
        </div>
      </div>
    </div>
  );
};

Question5.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}