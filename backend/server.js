const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;


mongoose.connect('mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(express.json());


const attemptSchema = new mongoose.Schema({
    userAnswer: String,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
});

const Attempt = mongoose.model('Attempt', attemptSchema);


app.get('/api/question', (req, res) => {
    res.json({
        question: 'Which brand is known for its iconic red sole shoes?',
        options: ['Gucci', 'Prada', 'Christian Louboutin', 'Versace'],
        correctAnswer: 'Christian Louboutin'
    });
});

app.get('/api/attempts', async (req, res) => {
    const attempts = await Attempt.find().sort({ timestamp: -1 });
    res.json(attempts);
});

app.post('/api/attempt', async (req, res) => {
    const newAttempt = new Attempt(req.body);
    await newAttempt.save();
    const attempts = await Attempt.find().sort({ timestamp: -1 });
    res.json(attempts);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
