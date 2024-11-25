import PropTypes from 'prop-types';

const IntroScreen = ({ onNext }) => {
  return (
    <div className="intro-screen">
      <h1>Bienvenido a la Aplicación de Recomendaciones</h1>
      <p>En esta aplicación, podrás obtener recomendaciones personalizadas basadas en tus preferencias.</p>
      <button onClick={onNext}>Comenzar</button>
    </div>
  );
};

IntroScreen.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default IntroScreen;
