import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

interface ExerciseBody {
  target: number;
  daily_exercises: Array<number>;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const result = calculateBmi(Number(height), Number(weight));
    res.json({ weight, height, result });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  if (!('daily_exercises' in req.body) || !('target' in req.body)) {
    res.json({ error: 'parameters missing' });
    return;
  }

  const { daily_exercises, target } = req.body as ExerciseBody;

  if (!isNaN(Number(target))) {
    const hours: Array<number> = [];
    let failed = false;
    daily_exercises.map(h => {
      if (!isNaN(Number(h))) {
        return hours.push(Number(h));
      } else {
        res.json({ error: 'malformatted parameters' });
        failed = true;
        return;
      }
    });
    if (!failed) {
      const result = calculateExercises(hours, target);
      res.json(result);
    }
  } else {
    res.json({ error: 'malformatted parameters' });
    return;
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
