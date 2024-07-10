import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [answerRank, setAnswerRank] = useState(null);
    const [answerOrder, setAnswerOrder] = useState([]);

    useEffect(() => {
        // Fetch the question from the server
        axios.get('http://localhost:5000/api/question')
            .then(response => {
                setQuestion(response.data.question);
                setOptions(response.data.options);
                setCorrectAnswer(response.data.correctAnswer);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the selected option is correct
        if (selectedOption === correctAnswer) {
            const currentOrder = answerOrder.length + 1; // Calculate current rank
            setAnswerRank(currentOrder); // Set the rank for the current correct answer
            setAnswerOrder([...answerOrder, currentOrder]); // Update the order of correct answers
        }

        setShowResults(true);
    };

    const handleOptionClick = (option) => {
        if (!showResults) {
            setSelectedOption(option);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Fashion Quiz</h1>
                <p>{question}</p>
                <form onSubmit={handleSubmit}>
                    <div className="options-container">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`option-box ${showResults && option === correctAnswer ? 'correct' : ''} ${showResults && option === selectedOption && option !== correctAnswer ? 'wrong' : ''} ${selectedOption === option && !showResults ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                                {showResults && option === correctAnswer && <span className="icon">&#10003;</span>}
                                {showResults && option === selectedOption && option !== correctAnswer && <span className="icon">&#10007;</span>}
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                {showResults && selectedOption === correctAnswer && (
                    <div className="rank">
                        Your rank: {answerRank}
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
