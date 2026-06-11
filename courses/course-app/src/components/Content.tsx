interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts } : ContentProps) => {
  return (
    <div>
      {courseParts.map((x) => (
        <p key={x.name}>
          {x.name} {x.exerciseCount}
        </p>
      ))}
    </div>
  );
};