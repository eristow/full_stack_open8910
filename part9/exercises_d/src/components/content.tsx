import React from 'react';
import { CoursePart } from '../types';
import Part from './part';

interface Props {
  contents: Array<CoursePart>;
}

const Content: React.FC<Props> = ({ contents }) => {
  return (
    <>
      {contents.map(content => (
        <div key={content.name}>
          <h2>
            {content.name}: {content.exerciseCount}
          </h2>
          <Part part={content} />
        </div>
      ))}
    </>
  );
};

export default Content;
