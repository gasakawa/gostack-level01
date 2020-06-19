import React, { useState, useEffect } from 'react';

import Header from './conponents/Header';
import api from './services/api';

import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => setProjects(response.data));
  }, []);

  const handleAddProject = async () => {
    const response = await api.post('/projects', {
      title: 'React',
      owner: 'Gabriel',
    });
    setProjects([...projects, response.data]);
  };

  return (
    <>
      <Header title="React JS" />
      <ul>
        {projects.map(project => {
          return (
            <li key={project.id}>
              Project {project.title} - Owner {project.owner}
            </li>
          );
        })}
      </ul>
      <button type="submit" onClick={handleAddProject}>
        Enviar
      </button>
    </>
  );
};

export default App;
