import React from 'react';

type CoursePart = {
  name: string;
  exerciseCount: number;
};

interface Props {
  contents: Array<CoursePart>;
}

const Content: React.FC<Props> = ({ contents }) => {
  return (
    <>
      {contents.map(content => (
        <p key={content.name}>
          {content.name}: {content.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
