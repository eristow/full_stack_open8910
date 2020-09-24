import React from 'react';
import ReactDOM from 'react-dom';
import Content from './components/content';
import Header from './components/header';
import Total from './components/total';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
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
