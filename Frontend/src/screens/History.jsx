import { useState } from 'react';
import fondo from '../assets/Fondo.png'
import { GroupsList } from '../components/GroupsList';
import line from '../assets/line.png'
import { Movie } from '../components/Movie';

export const History = () => {
  const [selectedGroup, setSelectedGroup] = useState(0);

  const groups = [
    {
      group_name: 'ballenitas',
      recommendations: [
        {
          title: 'Peli1',
          year: '2004'
        },
        {
          title: 'Peli2',
          year: '2005'
        },
        {
          title: 'Peli3',
          year: '2004'
        },
        {
          title: 'Peli4',
          year: '2005'
        },
        {
          title: 'Peli5',
          year: '2004'
        }
      ]
    },
    {
      group_name: 'perritos',
      recommendations: [
        {
            title: 'Peli6',
            year: '2004'
          },
          {
            title: 'Peli7',
            year: '2005'
          },
          {
            title: 'Peli8',
            year: '2004'
          },
          {
            title: 'Peli9',
            year: '2005'
          },
          {
            title: 'Peli10',
            year: '2004'
          }
      ]
    },
    {
      group_name: 'sapos',
      recommendations: [
        {
            title: 'Peli11',
            year: '2004'
          },
          {
            title: 'Peli12',
            year: '2005'
          },
          {
            title: 'Peli13',
            year: '2004'
          },
          {
            title: 'Peli14',
            year: '2005'
          },
          {
            title: 'Peli15',
            year: '2004'
          }
      ]
    }
  ]
  return (
    <div className="flex flex-col w-full h-full items-center justify-start min-h-screen text-white">
        
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
        
        <section className='flex flex-row relative w-full px-24 z-10 mt-12 items-center h-fit'>
            <GroupsList
                groups={groups}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />

            <img className="flex mx-10 h-[600px] " src={line} />

            <main className="flex w-3/4 h-full flex-col px-2 justify-start ">
                <h2 className="text-2xl font-medium">Recommendations for <span className="text-primary-lightpink">{groups[selectedGroup].group_name} </span></h2>

                <section className='flex flex-wrap mt-20 h-fit mb-6 space-x-12'>
                    
                    <div className="flex w-full space-x-6 items-center justify-center">
                        {groups[selectedGroup].recommendations.map((rec, index) => (
                            <Movie
                                key={index}
                                title={rec.title}
                                releaseYear={rec.releaseYear}
                                rating={rec.imdbAverageRating}
                                genres={rec.genres}
                                type={rec.type}
                                platform={rec.platform}
                                size={'small'}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </section>
    </div>
  );
};
