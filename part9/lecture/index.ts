import express from 'express';
import { calculator } from './calculator';
const app = express();

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;

  if (!isNaN(Number(value1)) && !isNaN(Number(value2))) {
    const result = calculator(Number(value1), Number(value2), String(op));
    res.send(String(result));
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
