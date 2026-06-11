interface ExerciseCountProps {
  totalExercises: number;
}
export const Total = ({ totalExercises }: ExerciseCountProps) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};