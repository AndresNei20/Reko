import { useState } from 'react';

function App() {
  const [respuestas, setRespuestas] = useState([{
    plataformas: [],
    generos: [],
    formato: '',
    calificacion_minima: '',
    rango_anios: { desde: '', hasta: '' }
  }]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [error, setError] = useState(''); // Para manejar mensajes de error

  const handleChange = (index, field, value) => {
    const updatedRespuestas = [...respuestas];
    updatedRespuestas[index][field] = value;
    setRespuestas(updatedRespuestas);
  };

  // Maneja el cambio de selección en las plataformas
  const handleCheckboxChange = (index, field, value) => {
    const updatedRespuestas = [...respuestas];
    const selectedValues = updatedRespuestas[index][field];

    // Alternar la selección del valor
    if (selectedValues.includes(value)) {
      updatedRespuestas[index][field] = selectedValues.filter(item => item !== value);
    } else {
      updatedRespuestas[index][field] = [...selectedValues, value];
    }
    setRespuestas(updatedRespuestas);
  };

  const handleAddResponse = () => {
    setRespuestas([...respuestas, {
      plataformas: [],
      generos: [],
      formato: '',
      calificacion_minima: '',
      rango_anios: { desde: '', hasta: '' }
    }]);
  };

  const validateRespuestas = () => {
    for (let respuesta of respuestas) {
      if (respuesta.plataformas.length === 0) {
        setError('Debes seleccionar al menos una plataforma');
        return false;
      }
      if (respuesta.generos.length === 0) {
        setError('Debes seleccionar al menos un género');
        return false;
      }
      if (!respuesta.formato.trim()) {
        setError('El campo "Formato" no puede estar vacío');
        return false;
      }
      if (!respuesta.calificacion_minima || isNaN(respuesta.calificacion_minima) || respuesta.calificacion_minima <= 0) {
        setError('La "Calificación mínima" debe ser un número mayor a 0');
        return false;
      }
      if (!respuesta.rango_anios.desde || !respuesta.rango_anios.hasta || respuesta.rango_anios.desde > respuesta.rango_anios.hasta) {
        setError('El "Rango de años" es inválido');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateRespuestas()) return;

    try {
      const respuestasConvertidas = respuestas.map(respuesta => ({
        ...respuesta,
        calificacion_minima: parseFloat(respuesta.calificacion_minima)
      }));

      const response = await fetch('http://localhost:5000/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: respuestasConvertidas })
      });
      const data = await response.json();
      setRecomendaciones(data.recomendaciones);
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
    }
  };

  return (
    <div>
      <h1>Recomendador</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {respuestas.map((respuesta, index) => (
        <div key={index}>
          <h3>Preferencia {index + 1}</h3>

          {/* Checkboxes para las plataformas */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={respuesta.plataformas.includes('Netflix')}
                onChange={() => handleCheckboxChange(index, 'plataformas', 'Netflix')}
              />
              Netflix
            </label>
            <label>
              <input
                type="checkbox"
                checked={respuesta.plataformas.includes('HBO')}
                onChange={() => handleCheckboxChange(index, 'plataformas', 'HBO')}
              />
              HBO
            </label>
            <label>
              <input
                type="checkbox"
                checked={respuesta.plataformas.includes('Prime')}
                onChange={() => handleCheckboxChange(index, 'plataformas', 'Prime')}
              />
              Prime
            </label>
          </div>

          {/* Checkboxes para los géneros */}
          <div>
            <h4>Géneros</h4>
            {["Comedy", "Drama", "Action", "Horror", "Romance", "Sci-Fi", "Fantasy"].map(genre => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={respuesta.generos.includes(genre)}
                  onChange={() => handleCheckboxChange(index, 'generos', genre)}
                />
                {genre}
              </label>
            ))}
          </div>

          {/* Campo para formato (checkboxes) */}
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
          <input
            type="number"
            placeholder="Calificación mínima"
            value={respuesta.calificacion_minima}
            onChange={(e) => handleChange(index, 'calificacion_minima', e.target.value)}
          />

          {/* Rango de años */}
          <input
            type="number"
            placeholder="Año desde"
            value={respuesta.rango_anios.desde}
            onChange={(e) => handleChange(index, 'rango_anios', { ...respuesta.rango_anios, desde: e.target.value })}
          />
          <input
            type="number"
            placeholder="Año hasta"
            value={respuesta.rango_anios.hasta}
            onChange={(e) => handleChange(index, 'rango_anios', { ...respuesta.rango_anios, hasta: e.target.value })}
          />
        </div>
      ))}

      <button onClick={handleAddResponse}>Agregar Preferencia</button>
      <button onClick={handleSubmit}>Obtener Recomendaciones</button>

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
}

export default App;
