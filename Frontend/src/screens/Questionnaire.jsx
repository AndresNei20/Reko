import { useEffect, useState } from "react";
import { Question1 } from "../components/Question1";
import { Question2 } from "../components/Question2";
import { Question3 } from "../components/Question3";
import { Question4 } from "../components/Question4";
import { Question5 } from "../components/Question5";
import { useNavigate } from "react-router-dom";
import fondo from '../assets/Fondo.png'
import PropTypes from 'prop-types';
import profileImg1 from '../assets/profile1.png'
import profileImg2 from '../assets/profile2.png'
import profileImg3 from '../assets/profile3.png'
import profileImg4 from '../assets/profile4.png'
import profileImg5 from '../assets/profile5.png'
import profileImg6 from '../assets/profile6.png'
import profileImg7 from '../assets/profile7.png'
import profileImg8 from '../assets/profile8.png'
import profileImg9 from '../assets/profile9.png'
import profileImg10 from '../assets/profile10.png'

const profileImages = {
  profileImg1,
  profileImg2, 
  profileImg3,
  profileImg4,
  profileImg5,
  profileImg6,
  profileImg7,
  profileImg8,
  profileImg9,
  profileImg10
}

// Convertimos el objeto de imágenes a un array
  const profileImagesArray = Object.values(profileImages);

  // Función para desordenar el array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
  };

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

    const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Desordenar el array de imágenes al inicio
    setShuffledImages(shuffleArray(profileImagesArray));
  }, []); // Solo se ejecuta al montar el componente


  
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
    <div className="flex flex-col items-center min-h-screen text-white">

        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
        
        <section className="flex flex-col relative w-full px-32 z-10 mt-24 items-center h-fit">
          <h2 className="text-4xl font-bold">Who wants a Reko?</h2>
          <div className="flex flex-wrap mt-4 items-center ">

            
          {responses.map((_, index) => (
            <figure className="flex flex-col items-center" key={index}>
              <img
                onClick={() => handleSelectResponse(index)}
                className={`px-4 py-2 m-2 rounded ${
                  index === activeResponseIndex ? "w-28" : "w-20"
                }`}
                src={shuffledImages[index]} // Usamos la imagen desordenada
                alt={`Profile ${index + 1}`}
              />
              <h3 className="text-white text-sm">Friend {index + 1}</h3>
            </figure>
          ))}

            <button
                className=" ml-4 text-white py-1 px-3 mt-4 text-6xl rounded-lg"
                onClick={handleAddResponse}
            >
                +
            </button>
          </div>

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
