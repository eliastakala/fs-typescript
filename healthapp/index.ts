import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello fullstack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = req.query.height;
    const weight = req.query.weight;
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
});

app.use(express.json());

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    if (daily_exercises === undefined || target === undefined) {
      console.log("toimiiks");
      return res.status(400).json({
        error: "parameters missing",
      });
    }

    console.log("testi", daily_exercises, target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exercise_numbers: number[] = daily_exercises.map((x: any) =>
      Number(x),
    );
    const result: unknown = calculateExercises(
      exercise_numbers,
      Number(target),
    );
    console.log("res", result);
    return res.send(result);
  } catch (error: unknown) {
    console.log('ollaan errorissa')
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).json({
      error: errorMessage,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
