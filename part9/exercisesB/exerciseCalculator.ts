export interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface ExerciseValues {
//   target: number;
//   hours: Array<number>;
// }

// const parseArgs = (args: Array<string>): ExerciseValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   if (!isNaN(Number(args[2]))) {
//     const hours: Array<number> = [];
//     args.slice(3).map(a => hours.push(Number(a)));
//     return {
//       target: Number(args[2]),
//       hours,
//     };
//   } else {
//     throw new Error('Provided values were not numbers');
//   }
// };

export const calculateExercises = (
  dailyHours: Array<number>,
  target: number,
): Results => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h !== 0).length;
  const totalExerciseHours = dailyHours.reduce((sum, h) => (sum += h));
  const average = totalExerciseHours / periodLength;
  const success = average >= target;

  const bottomBaseLine = target * 0.8;
  const topBaseline = target * 1.2;

  let rating = 0;
  let ratingDescription = '';

  if (average < bottomBaseLine) {
    rating = 1;
    ratingDescription = 'Try harder next week.';
  } else if (average >= bottomBaseLine && average < topBaseline) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be better.';
  } else if (average >= topBaseline) {
    rating = 3;
    ratingDescription = 'Great job!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { target, hours } = parseArgs(process.argv);
//   console.log(calculateExercises(hours, target));
// } catch (e) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   console.log('Error:', e.message);
// }
