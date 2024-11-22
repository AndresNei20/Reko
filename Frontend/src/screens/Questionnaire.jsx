import { useEffect, useState } from "react";
import { Question1 } from "../components/Question1";
import { Question2 } from "../components/Question2";
import { Question3 } from "../components/Question3";
import { Question4 } from "../components/Question4";
import { Question5 } from "../components/Question5";
import { useNavigate } from "react-router-dom";
import fondo from '../assets/back.png'
import PropTypes from 'prop-types';
import { UserList } from "../components/UsersList";


export const Questionnaire = ({ setRecommendations }) => {
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [responses, setResponses] = useState([
    {
      plataformas: [],
      generos: [],
      formato: "",
      calificacion_minima: "",
      rango_anios: { desde: "", hasta: "" },
    },
  ])

  
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
      setRecommendations(data.recomendaciones);
      console.log('recomendation', data.recomendaciones, data);
      
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
    setActiveResponseIndex(index);
    setCurrentQuestion(1) // Cambiar el usuario seleccionado
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
    <div className="flex flex-col w-full h-full items-center min-h-screen text-white">

        <div className="flex fixed top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
        
        <section className="flex relative w-full h-full px-24 z-10 mt-8 items-start">
          

          <UserList
              responses={responses}
              activeResponseIndex={activeResponseIndex} 
              handleSelectResponse={handleSelectResponse}
              handleAddResponse={handleAddResponse}
          />

          <h2 className="text-4xl font-bold mt-10">What are your preferences?</h2>

          <h1 className="text-2xl font-bold my-6">{currentQuestion + '/5'}</h1>

          <section className="w-[1500px] h-fit mb-6">{renderQuestion()}</section>
            
          <section className="flex flex-row items-center space-x-32">
            <button
              onClick={handlePrev}
              className="px-4 py-2  bg-primary-blue text-white rounded hover:bg-gray-900"
              disabled={currentQuestion === 1}
            >
              ← Previous
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-3 bg-primary-lightpink text-white text-2xl rounded-lg hover:bg-primary-darkpink mt-8"
            >
              Get Reko
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-primary-blue text-white rounded  hover:bg-gray-900"
              disabled={currentQuestion === 5}
            >
              Next →
            </button>

            

          </section>

          <h2>Error: {error} </h2>
        </section>
        
        


      
    </div>
  );
};

Questionnaire.propTypes = {
  setRecommendations: PropTypes.func.isRequired
};
