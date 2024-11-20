import { useState } from "react";
import { Question1 } from "../components/Question1";
import { Question2 } from "../components/Question2";
import { Question3 } from "../components/Question3";
import { Question4 } from "../components/Question4";
import { Question5 } from "../components/Question5";
import { useNavigate } from "react-router-dom";
import { User } from "../components/User"; 
import PropTypes from 'prop-types';

export const Questionnaire = ({ setRecommendations, setError }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [responses, setResponses] = useState([
    {
      plataformas: [],
      generos: [],
      formato: "",
      calificacion_minima: "",
      rango_anios: { desde: "", hasta: "" },
    },
  ]);
  const [activeResponseIndex, setActiveResponseIndex] = useState(0); // Índice del usuario seleccionado
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handleResponseChange = (field, value) => {
    const updatedResponses = [...responses];
    updatedResponses[activeResponseIndex] = {
      ...updatedResponses[activeResponseIndex],
      [field]: value,
    };
    setResponses(updatedResponses);
    console.log('responses', updatedResponses);
    
  };

  const validateResponses = () => {
    const activeResponse = responses[activeResponseIndex];
    // Validar solo el usuario seleccionado
    if (activeResponse.plataformas.length === 0) {
      setError("Debes seleccionar al menos una plataforma");
      return false;
    }
    if (activeResponse.generos.length === 0) {
      setError('El campo "Géneros" no puede estar vacío');
      return false;
    }
    if (!activeResponse.formato.trim()) {
      setError('El campo "Formato" no puede estar vacío');
      return false;
    }
    if (
      !activeResponse.calificacion_minima ||
      isNaN(activeResponse.calificacion_minima) ||
      activeResponse.calificacion_minima <= 0
    ) {
      setError('La "Calificación mínima" debe ser un número mayor a 0');
      return false;
    }
    if (
      !activeResponse.rango_anios.desde ||
      !activeResponse.rango_anios.hasta ||
      activeResponse.rango_anios.desde > activeResponse.rango_anios.hasta
    ) {
      setError('El "Rango de años" es inválido');
      return false;
    }

    setError(""); // Si pasa la validación, limpiar el error
    return true;
  };

  const handleSubmit = async () => {
    if (!validateResponses()) return;

    try {
      const responsesConverted = responses.map((response) => ({
        ...response,
        calificacion_minima: parseFloat(response.calificacion_minima),
      }));

      const response = await fetch("http://localhost:5000/recomendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas: responsesConverted }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
      navigate("/recommendation");
    } catch (error) {
      console.error("Error al obtener recommendations:", error);
    }
  };

  const handleAddResponse = () => {
    setResponses([
      ...responses,
      {
        plataformas: [],
        generos: [],
        formato: "",
        calificacion_minima: "",
        rango_anios: { desde: "", hasta: "" },
      },
    ]);
    setActiveResponseIndex(responses.length); // Seleccionar la nueva respuesta añadida
  };

  const handleSelectResponse = (index) => {
    setActiveResponseIndex(index); // Cambiar el usuario seleccionado
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <Question1 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 2:
        return <Question2 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 3:
        return <Question3 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 4:
        return <Question4 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      case 5:
        return <Question5 responses={responses[activeResponseIndex]} onChange={handleResponseChange} />;
      default:
        return null;
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="flex flex-wrap mt-4 items-center ">
        {responses.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelectResponse(index)}
            className={`px-4 py-2 m-2 rounded ${
              index === activeResponseIndex
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img>
            Usuario {index + 1}
          </button>
        ))}

        <button
            className="bg-teal-600 text-white py-2 px-3 mt-4 rounded-lg"
            onClick={handleAddResponse}
        >
            +
        </button>
      </div>

      <h1 className="text-2xl font-bold my-6">Pregunta {currentQuestion}</h1>
      <div className="mb-6">{renderQuestion()}</div>
      <div className="flex space-x-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentQuestion === 1}
        >
          Previous
        </button>
        
       
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={currentQuestion === 5}
          >
            Next
          </button>
        
      </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-8"
          >
            Finish
          </button>

      
    </div>
  );
};

Questionnaire.propTypes = {
  setRecommendations: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
