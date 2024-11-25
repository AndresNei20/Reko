import CheckboxGroup from './CheckboxGroup';
import PropTypes from 'prop-types';
import InputField from './InputField';

const PreferenciaForm = ({ respuesta, index, handleCheckboxChange, handleChange }) => {
  return (
    <div key={index}>
      <h3>Preferencia {index + 1}</h3>

      {/* Checkboxes para las plataformas */}
      <CheckboxGroup
        label="Plataformas"
        options={['Netflix', 'HBO', 'Prime']}
        selectedValues={respuesta.plataformas}
        onChange={(value) => handleCheckboxChange(index, 'plataformas', value)}
      />

      {/* Checkboxes para los géneros */}
      <CheckboxGroup
        label="Géneros"
        options={["Comedy", "Drama", "Action", "Horror", "Romance", "Sci-Fi", "Fantasy"]}
        selectedValues={respuesta.generos}
        onChange={(value) => handleCheckboxChange(index, 'generos', value)}
      />

      {/* Campo para formato */}
      <div>
        <h4>Formato</h4>
        <label>
          <input
            type="checkbox"
            checked={respuesta.formato === 'movie'}
            onChange={() => handleChange(index, 'formato', 'movie')}
          />
          Película
        </label>
        <label>
          <input
            type="checkbox"
            checked={respuesta.formato === 'show'}
            onChange={() => handleChange(index, 'formato', 'show')}
          />
          Show
        </label>
      </div>

      {/* Calificación mínima */}
      <InputField
        label="Calificación mínima"
        type="number"
        value={respuesta.calificacion_minima}
        onChange={(value) => handleChange(index, 'calificacion_minima', value)}
      />

      {/* Rango de años */}
      <div>
        <InputField
          label="Año desde"
          type="number"
          value={respuesta.rango_anios.desde}
          onChange={(value) => handleChange(index, 'rango_anios', { ...respuesta.rango_anios, desde: value })}
        />
        <InputField
          label="Año hasta"
          type="number"
          value={respuesta.rango_anios.hasta}
          onChange={(value) => handleChange(index, 'rango_anios', { ...respuesta.rango_anios, hasta: value })}
        />
      </div>
    </div>
  );
};

PreferenciaForm.propTypes = {
    respuesta: PropTypes.shape({
      plataformas: PropTypes.arrayOf(PropTypes.string).isRequired,
      generos: PropTypes.arrayOf(PropTypes.string).isRequired,
      formato: PropTypes.string.isRequired,
      calificacion_minima: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      rango_anios: PropTypes.shape({
        desde: PropTypes.string.isRequired,
        hasta: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

export default PreferenciaForm;
