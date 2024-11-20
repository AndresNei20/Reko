import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';

export const Question5 = ({ responses, onChange }) => {
  const handleSliderChange = (values) => {
    onChange('rango_anios', { desde: values[0], hasta: values[1] });
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-20">What range of years do you prefer?</h2>
      
      <div className="flex flex-col items-center space-y-2">
        <div className="w-full max-w-lg mx-auto items-center justify-center mb-12">
          <ReactSlider
            className="my-slider"
            value={[responses.rango_anios.desde, responses.rango_anios.hasta]}
            onChange={handleSliderChange}
            min={1400}
            max={2024}  // Puedes ajustar estos valores según el rango de años que quieras
            step={1}
            renderTrack={(props, state) => (
              <div {...props} className="flex-1 bg-gray-300 h-2 rounded-lg" />
            )}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="w-6 h-6 inset-y-[-6px] bg-primary-lightpink rounded-full cursor-pointer"
              />
            )}
          />
        </div>

        <div className="flex justify-between w-full max-w-lg mx-auto">
          <div className="flex items-center">
            <label className="mr-2">From:</label>
            <input
              type="number"
              value={responses.rango_anios.desde}
              onChange={(e) =>
                onChange("rango_anios", { ...responses.rango_anios, desde: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 text-white"
              placeholder="Start year"
              min="1400"
              max="2024"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">To:</label>
            <input
              type="number"
              value={responses.rango_anios.hasta}
              onChange={(e) =>
                onChange("rango_anios", { ...responses.rango_anios, hasta: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 text-white"
              placeholder="End year"
              min="1400"
              max="2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Question5.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
