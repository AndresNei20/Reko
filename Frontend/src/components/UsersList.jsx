import nofillIcon from '../assets/nofill.png'
import fillIcon from '../assets/fill.png'
import plusIcon from '../assets/plus-icon.png'
import dots from '../assets/dots.png'

import { useEffect, useState } from 'react'
import { profileImages } from '../services/profileImg';

export const UserList = ({responses, activeResponseIndex, handleSelectResponse, handleAddResponse}) => {


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

  
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(profileImagesArray));
  }, []); 
  
  const areFieldsFilled = (response) => {
    return (
      response.plataformas.length > 0 && 
      response.generos.length > 0 && 
      response.formato !== "" && 
      response.calificacion_minima !== "" && 
      response.rango_anios.desde !== "" && 
      response.rango_anios.hasta !== "" 
    );
  };


  return (
    <div className="flex flex-col w-[250px] h-[46rem] mt-4 pb-10 pt-5 px-2 items-center bg-gray-950 rounded-lg">
      <img className="w-16 mb-5" src={dots} />
      <p className="w-[60%] flex text-2xl font-light text-start mb-2">Our group name</p>

      <div className="flex flex-col items-center justify-start overflow-y-auto max-h-[40rem] w-full hide-scrollbar pt-4">
        {responses.map((response, index) => (
          <figure
            className={`flex flex-row items-center justify-center ${
              index === 0 ? 'mt-2' : 'my-4'
            }`}
            key={index}
          >
            <img
              onClick={() => handleSelectResponse(index)}
              className={`px-1 py-1 mr-4 rounded w-28 ${
                index === activeResponseIndex ? 'border-[4px] border-white' : ''
              }`}
              src={shuffledImages[index]}
              alt={`Profile ${index + 1}`}
            />
            <img
              className="w-10"
              src={areFieldsFilled(response) ? fillIcon : nofillIcon}
              alt={areFieldsFilled(response) ? 'Filled Icon' : 'Not Filled Icon'}
            />
          </figure>
        ))}

        <button
          className="ml-4 text-white py-1 px-3 mt-4"
          onClick={handleAddResponse}
        >
          <img className="w-16 mt-8" src={plusIcon} />
        </button>
      </div>
    </div>
  );
};