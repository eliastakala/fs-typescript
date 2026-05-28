import { parseData, feedback, calculateRating } from "./utils.ts";

interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (data: number[], target: number): Output => {
  const periodLength = data.length;
  const trainingDays = data.filter((x) => x > 0).length;
  const avg = data.reduce((a, b) => a + b) / data.length;
  const rating = calculateRating(avg, target);
  const success = avg > target;
  const feedbackText = feedback(rating);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: feedbackText,
    target: target,
    average: avg,
  };
};

try {
  const data = parseData(process.argv);
  const target: number = data.shift() ?? 0;
  const res = calculateExercises(data, target);
  console.log(res);
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
