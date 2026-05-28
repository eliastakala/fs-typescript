interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));

export const parseData = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const arr = args.slice(2);
  if (arr.filter((x) => !isNaN(Number(x))).length < arr.length) {
    throw new Error("Provided values were not numbers!");
  } else {
    return args.slice(2).map((x) => Number(x));
  }
};

export const feedback = (rating: number): string => {
  switch (rating) {
    case 1:
      return "go jogging";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "good job";
    default:
      throw new Error("Unknown rating");
  }
};

export const calculateRating = (avg: number, target: number): number => {
  if (avg > target) {
    return 3;
  } else if (avg / target > 0.5) {
    return 2;
  }
  return 1;
};
