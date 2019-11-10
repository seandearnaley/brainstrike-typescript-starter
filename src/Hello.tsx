import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetTechsQuery } from './generated/graphql';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = (props: HelloProps): React.ReactElement => {
  const { data, loading, error } = useGetTechsQuery();

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  const techs = data && data.techniques;

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      {techs &&
        techs.map(tech => (
          <div key={tech.id}>
            {tech.id} {tech.description} {tech.label}
          </div>
        ))}{' '}
      {props.name}
    </div>
  );
};

export default Hello;
