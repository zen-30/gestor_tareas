import express from 'express';
import cors from 'cors';
import TaskService from './domain/services/TaskService.js';
import ProjectService from './domain/services/ProjectService.js';
import InMemoryProjectRepository from './adapters/out/InMemoryProjectRepository.js';
import InMemoryTaskRepository  from './adapters/out/InMemoryTaskRepository.js';
import createProjectRouter from './adapters/in/projectRouter.js';
import createTaskRouter from './adapters/in/taskRouter.js';

// mock data
import { projects } from './mock/data.js';
import { tasks } from './mock/data.js';

// Inicializar express
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['*']
}));

// Inicializar repositorios
const inmemoryProjectRepository = new InMemoryProjectRepository();
const inmemoryTaskRepository = new InMemoryTaskRepository();
inmemoryProjectRepository.projects = projects;
inmemoryTaskRepository.tasks = tasks;

// Inicializar servicios e inyectar los repositorios como dependencias
const taskService = new TaskService(inmemoryTaskRepository);
const projectService = new ProjectService(inmemoryProjectRepository);

// Crear routers e inyectar los servicios como dependencias
const taskRouter = createTaskRouter(taskService);
const projectRouter = createProjectRouter(projectService, taskService);

app.use('/api', taskRouter);
app.use('/api', projectRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/api');
});
