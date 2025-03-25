import express from 'express';
import calculateBMI from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  let height = parseInt(req.query.height as string)
  let weight = parseInt(req.query.weight as string)
  let result = calculateBMI(height, weight)

  if (isNaN(height) || isNaN(weight) ||
   (height) == undefined || weight == undefined) {
    res.send({ error: "malformatted parameters" })
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: result
    });
  }
})

app.post('/exercises', (req, res) => {
  let totalKeys = Object.keys(req.body)
  console.log(totalKeys)
  let target = parseInt(req.body.target as string)
  console.log(target)
  let totals: number[] = []
  let error: string = "";

  for (let t of totalKeys) {
    let number = parseInt(req.body[t] as string)
    if (isNaN(number)) {
      error = "malformatted parameters";
    } else {
      totals.push(parseInt(req.body[t] as string))
    }
  }

  if (isNaN(target) || error) {
    res.send({ error: "malformatted parameters"})
  } 
  if (target == undefined || totals.length === 0) {
    res.send({ error: "parameters missing"})
  }
  else {
    let result = exerciseCalculator(totals, target)
    res.send({
      periodLength: result.periodLength,
      trainingDays: result.trainingDays,
      success: result.success,
      rating: result.rating,
      ratingDescription: result.ratingDescription,
      target: result.target,
      average: result.average
    })
  }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})