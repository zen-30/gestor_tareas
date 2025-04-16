export default class TaskServicePort {

    // Obtener todas las tareas de un proyecto
    getTasksByProjectId(projectId) { }

    // Crea una nueva tarea
    createTask({ projectId, title, description = '', tags = [] }) { }

    // Actualizar el estado de una tarea
    updateTaskStatus(taskId, newStatus) { }

    // Obtener tareas con tags compartidos entre dos proyectos
    getTasksWithSharedTags(projectAId, projectBId) { }
}