import PropTypes from 'prop-types';
import RecomendacionesList from '../components/RecomendacionesList';

const RecommendationsScreen = ({ recomendaciones, onReset }) => {
  return (
    <div className="recommendations-screen">
      <h1>Recomendaciones Personalizadas</h1>
      <RecomendacionesList recomendaciones={recomendaciones} />
      <button onClick={onReset}>Volver al Inicio</button>
    </div>
  );
};

RecommendationsScreen.propTypes = {
  recomendaciones: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default RecommendationsScreen;
