// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const Content = ({ courseParts }: ContentProps) => {
  return courseParts.map((part) => {
    switch (part.kind) {
      case "basic":
        return (
          <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <br></br>
              <i>{part.description}</i>
              <br></br>
            </p>
          </div>
        );
      case "group":
        return (
          <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <br></br>
              <>project exercises {part.groupProjectCount}</>
              <br></br>
            </p>
          </div>
        );
      case "background":
        return (
          <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <br></br>
              <i>{part.description}</i>
              <br></br>
              <>submit to {part.backgroundMaterial}</>
            </p>
          </div>
        );
      case "special":
        return (
          <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <br></br>
              <i>{part.description}</i>
              <br></br>
              <>required skills: {part.requirements.join(", ")}</>
            </p>
          </div>
        );
      default:
        return assertNever(part);
    }
  });
};

// export const Content = ({ courseParts } : ContentProps) => {
//   return (
//     <div>
//       {courseParts.map((x) => (
//         <p key={x.name}>
//           {x.name} {x.exerciseCount}
//         </p>
//       ))}
//     </div>
//   );
// };
