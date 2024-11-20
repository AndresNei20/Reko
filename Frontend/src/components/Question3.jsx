import PropTypes from 'prop-types'

export const Question3 = ({ responses, onChange }) => {
  const options = ["movie", "show"];

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">What format do you prefer?</h2>
      <div className="flex flex-col items-center space-y-2">
        {options.map((option) => (
          <label 
            key={option} 
            className={`${responses.formato === option.toLowerCase()? "border-[3px] border-primary-lightpink" : ""} rounded-lg bg-primary-back py-2 px-4 cursor-pointer transition-all duration-300 transform hover:scale-110`}>
            <input
              type="radio"
              name="format"
              className="hidden"
              value={option.toLowerCase()}
              checked={responses.formato === option.toLowerCase()}
              onChange={(e) => onChange("formato", e.target.value)}
            />
            <img src="" alt="" />
            <span>{option == 'movie' ? 'Movies' : 'Series'}</span>
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