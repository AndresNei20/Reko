import { useState } from 'react';
import { Router } from './routers/Router';

function App() {
  const [respuestas, setRespuestas] = useState([{
    plataformas: [],
    generos: '',
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

  const handleCheckboxChange = (index, plataforma) => {
    const updatedRespuestas = [...respuestas];
    const plataformasSeleccionadas = updatedRespuestas[index].plataformas;
    
    // Alternar la selección de la plataforma
    if (plataformasSeleccionadas.includes(plataforma)) {
      updatedRespuestas[index].plataformas = plataformasSeleccionadas.filter(p => p !== plataforma);
    } else {
      updatedRespuestas[index].plataformas.push(plataforma);
    }
    setRespuestas(updatedRespuestas);
  };

  const handleAddResponse = () => {
    setRespuestas([...respuestas, {
      plataformas: [],
      generos: '',
      formato: '',
      calificacion_minima: '',
      rango_anios: { desde: '', hasta: '' }
    }]);
  };

  const validateRespuestas = () => {
    for (let respuesta of respuestas) {
      // Validación de plataformas
      if (respuesta.plataformas.length === 0) {
        setError('Debes seleccionar al menos una plataforma');
        return false;
      }

      // Validación de géneros
      if (!respuesta.generos.trim()) {
        setError('El campo "Géneros" no puede estar vacío');
        return false;
      }

      // Validación de formato
      if (!respuesta.formato.trim()) {
        setError('El campo "Formato" no puede estar vacío');
        return false;
      }

      // Validación de calificación mínima (convertir a número)
      if (!respuesta.calificacion_minima || isNaN(respuesta.calificacion_minima) || respuesta.calificacion_minima <= 0) {
        setError('La "Calificación mínima" debe ser un número mayor a 0');
        return false;
      }

      // Validación de rango de años
      if (!respuesta.rango_anios.desde || !respuesta.rango_anios.hasta || 
          respuesta.rango_anios.desde > respuesta.rango_anios.hasta) {
        setError('El "Rango de años" es inválido');
        return false;
      }
    }

    setError(''); // Si todas las validaciones pasaron, limpiar el error
    return true;
  };

  const handleSubmit = async () => {
    if (!validateRespuestas()) return; // Solo enviar si las validaciones pasan

    try {
      // Convertir calificación mínima a número antes de enviar
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
       <Router />
      <h1>Recomendador</h1>
      
      {/* Mensaje de error */}
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
                onChange={() => handleCheckboxChange(index, 'Netflix')}
              />
              Netflix
            </label>
            <label>
              <input
                type="checkbox"
                checked={respuesta.plataformas.includes('HBO')}
                onChange={() => handleCheckboxChange(index, 'HBO')}
              />
              HBO
            </label>
            <label>
              <input
                type="checkbox"
                checked={respuesta.plataformas.includes('Prime')}
                onChange={() => handleCheckboxChange(index, 'Prime')}
              />
              Prime
            </label>
          </div>

          {/* Campo para géneros */}
          <input
            type="text"
            placeholder="Géneros (e.g., Comedy, Drama)"
            value={respuesta.generos}
            onChange={(e) => handleChange(index, 'generos', e.target.value)}
          />

          {/* Campo para formato */}
          <input
            type="text"
            placeholder="Formato (e.g., movie, show)"
            value={respuesta.formato}
            onChange={(e) => handleChange(index, 'formato', e.target.value)}
          />

          {/* Campo para calificación mínima */}
          <input
            type="number"
            placeholder="Calificación mínima"
            value={respuesta.calificacion_minima}
            onChange={(e) => handleChange(index, 'calificacion_minima', e.target.value)}
          />

          {/* Campos para el rango de años */}
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
        {recomendaciones && recomendaciones.length > 0 ? (
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
