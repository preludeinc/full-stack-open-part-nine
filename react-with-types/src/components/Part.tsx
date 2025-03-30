import { PartProps } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member:
    ${JSON.stringify(value)}`
  );
};


const Part: React.FC<PartProps> = ({ part }) => {
  if ("kind" in part) {
    switch (part.kind) {
      case "basic":
        return (
          <>
            <h3><b>{part.name} {part.exerciseCount}</b></h3>
            <p><i>{part.description}</i></p>
          </>
        );
      case "group":
        return (
          <>
            <h3><b>{part.name} {part.exerciseCount}</b></h3>
            <p>Group project count: {part.groupProjectCount}</p>
        </>
        );
      case "background":
        return (
          <>
            <h3><b>{part.name} {part.exerciseCount}</b></h3>
            <p><i>{part.description}</i></p>
            <p>submit to: {part.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <h3><b>{part.name} {part.exerciseCount}</b></h3>
            <p><i>{part.description}</i></p>
            {part.requirements.map((tech) => (
              <p>required skills: {tech}</p>
            ))}
          </>
        )
      default:
        return assertNever(part);
    }
  }
}

export default Part;