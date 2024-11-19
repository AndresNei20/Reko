import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Intro } from '../screens/Intro'
import { Questionnaire } from '../screens/Questionnaire'
import { Recommendation } from '../screens/Recommendation'
import PropTypes from 'prop-types'

export const Router = ({recommendations, setRecommendations, setError}) => {
  return (
    <BrowserRouter>

      <section className='content'>
        <Routes>
          <Route path='/' element={<Navigate to='/intro' />} />
          <Route path='/intro' element={<Intro />} />
          <Route path='/questionnaire' element={<Questionnaire setRecommendations={setRecommendations} setError={setError} />} />
          <Route path='/recommendation' 
            element={<Recommendation recommendations={recommendations} />}/>

        </Routes>
      </section>

    </BrowserRouter>
  )
}

Router.propTypes = {
    recommendations: PropTypes.array.isRequired,
    setRecommendations: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  }