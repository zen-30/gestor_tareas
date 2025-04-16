import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your API URL

// Definir la gestión de estados para proyectos y tareas
export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [],
    tasks: [],
    selectedProjectId: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        console.log(API_URL + '/api/projects')
        const response = await axios.get(API_URL + '/api/projects');
        this.projects = response.data;
      } catch (err) {
        this.error = 'Error al obtener los proyectos';
      } finally {
        this.loading = false;
      }
    },
    async fetchTasks(projectId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL + `/api/projects/${projectId}/tasks`);
        this.tasks = response.data;
        this.selectedProjectId = projectId;
      } catch (err) {
        this.error = 'Error al obtener las tareas';
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL + '/api/tasks', task);
        this.tasks.push(response.data);
      } catch (err) {
        this.error = 'Error al agregar la tarea';
      } finally {
        this.loading = false;
      }
    },
    async updateTaskStatus(taskId, status) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(API_URL + `/api/tasks/${taskId}`, { status });
        const task = this.tasks.find(t => t.id === taskId);
        if (task) task.status = response.data.status;
      } catch (err) {
        this.error = 'Error al actualizar el estado de la tarea';
      } finally {
        this.loading = false;
      }
    },
  },
});