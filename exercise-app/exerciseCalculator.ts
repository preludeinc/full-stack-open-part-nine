interface trainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: string[]): { argArray: number[], target: number } => {
  let argArray: number[] = [];
  let target: number;

  for (const value of argArray) {
    if (!isNaN(Number(args[value]))) throw new Error('Provided values were not numbers!');
    argArray.push(Number(value))
  }

  target = argArray[argArray.length - 1];
  return {
    argArray, target
  }
}

try {
  if (process.argv) {
    const { argArray, target }  = parseArguments(process.argv)
    console.log(argArray, target)
  }
} catch (error: unknown) {
  
  if (error instanceof Error) {
    let errorMessage = ''
    errorMessage += error.message;
  }
  console.log(error)
}

const exerciseCalculator = (a: number[], t: number): trainingResult => {
  let periodLen = a.length;
  let daysOfTraining = 0;
  let trainingTotal = 0;
  let metGoal = true;
  let ratingVal = 0;
  let ratingDesc = '';

  for (let n of a) {
    trainingTotal += n
    if (n > t) {
      daysOfTraining += 1
    }
    if (n < t) {
      metGoal = false
    }
  }
  console.log(trainingTotal)
  let average = trainingTotal / periodLen;

  if (daysOfTraining >= 3) {
    ratingVal = 3
    ratingDesc = 'great work!'
  } else if (daysOfTraining > 1 && daysOfTraining < 3) {
    ratingVal = 2
    ratingDesc = 'on your way to your goals'
  } else {
    ratingVal = 1
    ratingDesc = 'some training is better than none'
  }

  return {
    periodLength: periodLen,
    trainingDays: daysOfTraining,
    success: metGoal,
    rating: ratingVal,
    ratingDescription: ratingDesc,
    target: t,
    average: average
  }
}


try {
  const { argArray, target } = parseArguments(process.argv)
  console.log(exerciseCalculator(argArray, target))
} catch (error: unknown) {
  if (error instanceof Error) {
    let errorMessage = ''
    errorMessage += error.message;
  }
  console.log(error)
}

export default exerciseCalculator;

