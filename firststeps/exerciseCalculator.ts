interface Input {
  target: number;
  hoursList: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]) : Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  if (isNaN(Number(args[2]))) {
    throw new Error('Provided target was not a number!');
  }
  
  const hoursList = args.slice(3).map(Number);
  if (hoursList.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }
  
  return {
      target: Number(args[2]),
      hoursList
  };
};

const ratingFunc = (ratio: number) => {
  if (ratio < 0.7) {
    return {
      rating: 1,
      ratingDescription: "Poor result, try harder!"
    };
  }
  if (ratio < 1) {
    return {
      rating: 2,
      ratingDescription: "Not quite there yet!"
    };
  }
  return {
    rating: 3,
    ratingDescription: "Well done, target reached!"
  };
};

const calculateExercise = (hoursList: number[], target: number) : Result => {
  const periodLength = hoursList.length;
  const trainingDays = hoursList.filter(n => n !== 0).length;
  const average = (hoursList.reduce((acc, currentValue) => acc + currentValue, 0) / periodLength);
  const ratio = average / target;
  const success = (ratio >= 1);
  const { rating, ratingDescription } = ratingFunc(ratio);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// command line: npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
// first number is the target, the rest is hours of exercise per day
// calculations give a Result object
try {
  const { hoursList, target } = parseArguments(process.argv); //doesn't need to be in order
  console.log(calculateExercise(hoursList, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercise;