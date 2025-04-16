<template>
  <div>
    <div class="header">
      <h1 class="title">Gestor de Tareas Simple</h1>
      <p>Selecciona un proyecto para acceder a sus tareas o añadir una nueva.</p>
    </div>
    <ProjectList />
    <TaskList />
    <AddTaskForm />
  </div>
</template>

<script setup>
import ProjectList from '@/components/ProjectList.vue';

</script>

<style scoped>
.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.header{
  margin: 0 auto;
  padding: 1rem;
}
</style>
