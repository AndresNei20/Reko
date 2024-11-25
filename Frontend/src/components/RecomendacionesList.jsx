import PropTypes from 'prop-types';

const RecomendacionesList = ({ recomendaciones }) => {
  return (
    <div>
      <h2>Recomendaciones</h2>
      <ul>
        {recomendaciones.length > 0 ? (
          recomendaciones.map((rec, index) => (
            <li key={index}>{rec.title} ({rec.releaseYear})</li>
          ))
        ) : (
          <p>No hay recomendaciones disponibles.</p>
        )}
      </ul>
    </div>
  );
};

RecomendacionesList.propTypes = {
    recomendaciones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

export default RecomendacionesList;
