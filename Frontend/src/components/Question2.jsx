import PropTypes from 'prop-types'
import CheckboxImage from './CheckboxImage';
import comedyImg from '../assets/comedy.png'
import dramaImg from '../assets/drama.png'
import actionImg from '../assets/action.png'
import horroryImg from '../assets/horror.png'
import scifiImg from '../assets/scifi.png'
import animationImg from '../assets/animation.png'
import crimeImg from '../assets/crime.png'
import romanceImg from '../assets/romance.png'
import asianImg from '../assets/asian.png'
import musicalImg from '../assets/musical.png'
import thrillerImg from '../assets/thriller.png'
import fantasyImg from '../assets/fantasy.png'
import familyImg from '../assets/family.png'
import kidsImg from '../assets/kids.png'
import documentalImg from '../assets/documental.png'
import warImg from '../assets/war.png'
import mysteryImg from '../assets/mystery.png'
import sportImg from '../assets/sport.png'
import westernImg from '../assets/western.png'

export const Question2 = ({ responses, onChange }) => {
  const genres = [
    { value: "Comedy", img: comedyImg },
    { value: "Drama", img: dramaImg },
    { value: "Action", img: actionImg },
    { value: "Horror", img: horroryImg},
    { value: "Romance", img: romanceImg },
    { value: "Sci-Fi", img: scifiImg  },
    { value: "Fantasy", img: fantasyImg },
    { value: "Animation", img: animationImg},
    { value: "Thriller", img: thrillerImg },
    { value: "Asian", img: asianImg },
    { value: "True Crime", img: crimeImg },
    { value: "Musical", img: musicalImg },
    { value: "Family", img: familyImg },
    { value: "Kids", img: kidsImg },
    { value: "Documental", img: documentalImg },
    { value: "War", img: warImg },
    { value: "Mystery", img: mysteryImg },
    { value: "Sport", img: sportImg },
    { value: "Western", img: westernImg },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-20">Which genres do you prefer?</h2>
      <div className="flex flex-wrap justify-center space-x-4 space-y-2">
        {genres.map((genre) => (
  
          <CheckboxImage
            key={genre.value}
            value={genre.value}
            type="checkbox"
            altText={genre.value}
            imageSrc={genre.img}
            checked={responses.generos.includes(genre.value)}
            onChange={(e) =>
              onChange(
                "generos",
                e.target.checked
                  ? [...responses.generos, genre.value]
                  : responses.generos.filter((g) => g !== genre.value)
              )
            }
          />
          
        ))}
      </div>
    </div>
  );
};

Question2.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}