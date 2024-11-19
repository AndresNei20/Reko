import PropTypes from 'prop-types'

export const Question1 = ({ responses, onChange }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Select your favorite platforms</h2>
      <div className="flex flex-wrap justify-center space-x-4">
        <label>
          <input
            type="checkbox"
            value="Netflix"
            checked={responses.plataformas.includes("Netflix")}
            onChange={(e) =>
              onChange(
                "plataformas",
                e.target.checked
                  ? [...responses.plataformas, e.target.value]
                  : responses.plataformas.filter((p) => p !== e.target.value)
              )
            }
          />
          Netflix
        </label>
        <label>
          <input
            type="checkbox"
            value="Prime"
            checked={responses.plataformas.includes("Prime")}
            onChange={(e) =>
              onChange(
                "plataformas",
                e.target.checked
                  ? [...responses.plataformas, e.target.value]
                  : responses.plataformas.filter((p) => p !== e.target.value)
              )
            }
          />
          Prime Video
        </label>

        <label>
          <input
            type="checkbox"
            value="HBO"
            checked={responses.plataformas.includes("HBO")}
            onChange={(e) =>
              onChange(
                "plataformas",
                e.target.checked
                  ? [...responses.plataformas, e.target.value]
                  : responses.plataformas.filter((p) => p !== e.target.value)
              )
            }
          />
          HBO
        </label>

      </div>
    </div>
  );
};

Question1.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}