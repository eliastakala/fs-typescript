import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += error.message;
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
      return res.status(400).json({
        error: "parameters missing",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exercise_numbers: number[] = daily_exercises.map((x: any) =>
      Number(x),
    );
    const result: unknown = calculateExercises(
      exercise_numbers,
      Number(target),
    );
    return res.send(result);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json({
      error: errorMessage,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
