<template>
  <div v-if="selectedProjectId" class="task-form-container">
    <h2 class="title">Añadir Nueva Tarea</h2>
    <form @submit.prevent="submitTask">
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input class="input" type="text" v-model="title" placeholder="Título de la tarea" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Descripción</label>
        <div class="control">
          <textarea class="textarea" v-model="description" placeholder="Descripción de la tarea"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Etiquetas</label>
        <div class="control">
          <input class="input" type="text" v-model="tags" placeholder="Etiquetas separadas por comas" />
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" type="submit">Añadir Tarea</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProjectStore } from '@/stores/projectStore';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();

const { addTask } = projectStore;
const { selectedProjectId } = storeToRefs(projectStore);

const title = ref('');
const description = ref('');
const tags = ref('');

const submitTask = () => {
  const task = {
    projectId: selectedProjectId.value,
    title: title.value,
    description: description.value,
    tags: tags.value.split(',').map(tag => tag.trim()),
  };
  addTask(task);
  title.value = '';
  description.value = '';
  tags.value = '';
};
</script>

<style scoped>
.field {
  margin-bottom: 15px;
}
.task-form-container {
  margin-top: 20px;
  padding: 1em;
}
</style>