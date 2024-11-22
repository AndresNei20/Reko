import nofillIcon from '../assets/nofill.png'
import plusIcon from '../assets/plus-icon.png'
import dots from '../assets/dots.png'
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
import { useEffect, useState } from 'react'

export const UserList = ({responses, activeResponseIndex, handleSelectResponse, handleAddResponse}) => {


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

  
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(profileImagesArray));
  }, []); 



  return (
    <div className="flex flex-col w-[800px] h-[46rem] mt-4 pb-10 pt-5 px-2 items-center bg-gray-950 rounded-lg ">

            <img className="w-16 mb-5" src={dots} />
            <p className="w-[60%] flex text-2xl font-light text-start mb-2">Our group name</p>
            {responses.map((_, index) => (
              <figure className="flex flex-row items-center my-4" key={index}>
                <img
                  onClick={() => handleSelectResponse(index)}
                  className={`px-1 py-1 mr-4 rounded w-28 ${
                    index === activeResponseIndex ? "border-[4px] border-white" : ""
                  }`}
                  src={shuffledImages[index]}
                  alt={`Profile ${index + 1}`}
                />
                <img className="w-10" src={nofillIcon} />
              </figure>
            ))}

            <button
                className=" ml-4 text-white py-1 px-3 mt-4"
                onClick={handleAddResponse}
            >
              <img className="w-16 mt-8" src={plusIcon} />
            </button>
          </div>
  );
};