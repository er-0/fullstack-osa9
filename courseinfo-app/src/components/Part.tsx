import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part } : { part : CoursePart }) => {
  const text = (part : CoursePart) => {
    switch (part.kind) {
      case "basic":
        return <div><i>{part.description}</i></div>
      case "group":
        return <div>project exercises: {part.groupProjectCount}</div>
      case "background":
        return <div><i>{part.description}</i><br/>background material: {part.backgroundMaterial}</div>
      case "special":
        return <div><i>{part.description}</i><br/>required skills: {part.requirements.join(', ')}</div>
      default:
        return assertNever(part);
    }
  }
  return (
  <div>
    <b>{part.name} {part.exerciseCount}</b>
    {text(part)}
    <br/>
  </div>
  )
}

export default Part;