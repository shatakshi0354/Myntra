// App.js
import React, { useState } from 'react';
import Quiz from './Quiz';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleClick = () => {
    setShowQuiz(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome Myntra</h1>
      {!showQuiz && (
        <button onClick={handleClick}>Go to Quiz</button>
      )}
      {showQuiz && <Quiz />}
    </div>
  );
}

export default App;
