import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Intro } from '../screens/Intro'
import { Questionnaire } from '../screens/Questionnaire'
import { Recommendation } from '../screens/Recommendation'


export const Router = () => {
  return (
    <BrowserRouter>

      <section className='content'>
        <Routes>
          <Route path='/' element={<Navigate to='/intro' />} />
          <Route path='/intro' element={<Intro />} />
          <Route path='/questionnaire' element={<Questionnaire />} />
          <Route path='/recommendation' element={<Recommendation />} />

        </Routes>
      </section>

    </BrowserRouter>
  )
}