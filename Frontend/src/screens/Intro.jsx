import { NavLink } from "react-router-dom";

export const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Find the perfect movie to enjoy with your friends!
      </h1>
      <h2 className="text-lg md:text-xl text-center mb-8 text-gray-300">
        {`Tell us your group's preferences, and Reko will do the rest.`}
      </h2>
      
      <NavLink
        to="/questionnaire"
        className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition duration-300"
      >
        Find your movie!
      </NavLink>
    </div>
  );
};