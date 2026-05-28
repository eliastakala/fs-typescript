import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello fullstack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = req.query.height
        const weight = req.query.weight
        const bmi = calculateBmi(Number(height), Number(weight))
        res.json({
            weight: weight,
            height: height,
            bmi: bmi
        })
    } catch (error: any) {
        res.json({
            error: error.message
        })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});