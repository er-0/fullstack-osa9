interface Measurements {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Measurements => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  } else if ((Number(args[2]) < 50) || (Number(args[3]) < 10)) {
    throw new Error('Provided values not suited for BMI calculation');
    //illustrative minimum height not based on real limit
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
}

const calculateBmi = (height: number, weight: number) : string => {
  const cubedheight = (( height / 100 )**2 )
  const bmi = weight / cubedheight

  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25.0:
      return "Normal (healthy weight)";
    case bmi < 30.0:
      return "Overweight";
    case bmi >= 30.0:
      return "Obese";
    default:
      return "Something went wrong.";
  }
}

// command line: npm run calculateBMI 180 74
// arguments are parsed into height (cm) and weight (kg)
// then used to calculate bmi and print result to console
// "Normal (healthy weight)"
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;