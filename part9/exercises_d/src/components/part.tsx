import React from 'react';
import { CoursePart } from '../types';

interface Props {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part: React.FC<Props> = ({ part }) => {
  return (
    <>
      {(() => {
        switch (part.name) {
          case 'Fundamentals':
            return <p>Description: {part.description}</p>;
          case 'Using props to pass data':
            return <p>Group Project Count: {part.groupProjectCount}</p>;
          case 'Deeper type usage':
            return (
              <>
                <p>Description: {part.description}</p>
                <p>Exercise Submission Link: {part.exerciseSubmissionLink}</p>
              </>
            );
          case 'React Styling':
            return (
              <>
                <p>Description: {part.description}</p>
                <p>Student Count: {part.studentCount}</p>
              </>
            );
          default:
            return assertNever(part);
        }
      })()}
    </>
  );
};

export default Part;
