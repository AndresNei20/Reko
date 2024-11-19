import { useState } from 'react';
import { Router } from './routers/Router';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  return (
       <Router recommendations={recommendations} setRecommendations={setRecommendations} setError={setError} />
  );
}

export default App;
