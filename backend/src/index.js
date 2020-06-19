const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const projects = [];

const logRequests = (req, res, next) => {
  const { method, url } = req;
  console.log(`[${method.toUpperCase()}] - ${url}`);
  return next();
};

const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(404).json({ error: 'Invalid project Id' });
  }
  return next();
};

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };
  projects.push(project);
  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0) {
    return response.status(404).json({ error: 'Project not found' });
  }

  const { title, owner } = request.body;
  const project = {
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0) {
    return response.status(404).json({ error: 'Project not found' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Server listening on http://localhost:3333');
});
