import { useState } from 'react';
import { Router } from './routers/Router';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
       <Router recommendations={recommendations} setRecommendations={setRecommendations} />
  );
}

export default App;
