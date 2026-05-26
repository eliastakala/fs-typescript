interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const feedback = (rating: number): string => {
  switch (rating) {
    case 1:
      return "go jogging";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "good job";
    default:
      throw new Error("Unknown rating");
  };
};

const calculateRating = (avg: number, target: number): number => {
  if (avg > target) {
    return 3;
  } else if (avg / target > 0.5) {
    return 2;
  }
  return 1;
};

const calculateExercises = (data: number[], target: number): Output => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
