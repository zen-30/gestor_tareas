<template>
  <div v-if="loading" class="notification is-info">Cargando...</div>
  <div v-if="error" class="notification is-danger">{{ error }}</div>
  <div class="project-container">
    <h1 class="title">Proyectos</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <button class="button is-link" @click="selectProject(project.id)">{{ project.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { fetchProjects, fetchTasks } = projectStore;
const { projects, loading, error } = storeToRefs(projectStore);

const selectProject = (projectId) => {
    fetchTasks(projectId);
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
.project-container {
  margin-top: 20px;
  padding: 1em;
}
</style>