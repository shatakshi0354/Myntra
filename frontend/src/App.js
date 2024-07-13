// App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Stylematch from './components/Stylematch';
import Home from './components/Home';
import {Router,Routes,Route} from 'react-router-dom';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showStyleMatch, setShowStyleMtach] = useState(false);
 
  const handleShowQuiz = () => {
    setShowQuiz(true);
  };
  const handleShowStyleMatch = () => {
    setShowStyleMtach(true);
  }
  const handleOpenInNewTab = (path) => {
    window.open(path, '_blank');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome Myntra</h1>
      {!showQuiz && !showStyleMatch && (
        <>
          <button onClick={handleShowQuiz}>Go to Quiz</button>
          <button onClick={handleShowStyleMatch}>Search Outfits</button>
        </>
      )}
      
      {showQuiz ? <Quiz /> : showStyleMatch ? <Stylematch /> : <Home />}
    </div>
  );
}

export default App;