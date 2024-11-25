import PropTypes from 'prop-types';
import PreferenciaForm from '../components/PreferenciaForm';

const FormScreen = ({ onNext, respuestas, handleCheckboxChange, handleChange, handleAddResponse }) => {
  return (
    <div className="form-screen">
      <h1>Formulario de Preferencias</h1>
      {respuestas.map((respuesta, index) => (
        <PreferenciaForm
          key={index}
          index={index}
          respuesta={respuesta}
          handleCheckboxChange={handleCheckboxChange}
          handleChange={handleChange}
        />
      ))}
      <button onClick={handleAddResponse}>Agregar otra respuesta</button>
      <button onClick={onNext}>Obtener Recomendaciones</button>
    </div>
  );
};

FormScreen.propTypes = {
  onNext: PropTypes.func.isRequired,
  respuestas: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddResponse: PropTypes.func.isRequired,
};

export default FormScreen;
