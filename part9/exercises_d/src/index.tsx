import React from 'react';
import ReactDOM from 'react-dom';
import Content from './components/content';
import Header from './components/header';
import Total from './components/total';
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: Array<CoursePart> = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'React Styling',
      exerciseCount: 12,
      description: 'Great content',
      studentCount: 48,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content contents={courseParts} />
      <Total
        total={courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
