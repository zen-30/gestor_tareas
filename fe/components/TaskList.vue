<template>
  <div v-if="selectedProjectId" class="task-container">
    <h2 class="title">Tareas del Proyecto</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div class="box">
          <p><strong>{{ task.title }}</strong></p>
          <p>{{ task.description }}</p>
          <p :class="{
            'has-text-success': task.status === 'completada',
            'has-text-warning': task.status === 'en_progreso',
            'has-text-danger': task.status === 'pendiente'
          }">
            <em>Estado: {{ task.status }}</em>
          </p>
          <div class="buttons">
            <button class="button is-small is-success" @click="updateStatus(task.id, 'completada')" :disabled="loading">Completar</button>
            <button class="button is-small is-warning" @click="updateStatus(task.id, 'en_progreso')" :disabled="loading">En Progreso</button>
            <button class="button is-small is-danger" @click="updateStatus(task.id, 'pendiente')" :disabled="loading">Pendiente</button>
          </div>
          <p>Tags: <em>{{ task.tags.join(', ') }}</em></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { updateTaskStatus } = projectStore;
const { tasks, selectedProjectId, loading } = storeToRefs(projectStore);

const updateStatus = (taskId, status) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task?.status !== status) {
    updateTaskStatus(taskId, status);
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
.task-container {
  margin-top: 20px;
  padding: 1em;
}
</style>
