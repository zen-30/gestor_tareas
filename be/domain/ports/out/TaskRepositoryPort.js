// Interface de referencia para el repositorio de tareas
export default class TaskRepositoryPort {
    // Obtener todas las tareas de un proyecto
    getAllByProjectId(projectId) { }

    // Guardar una nueva tarea
    save(task) { }

    // Actualizar el estado de una tarea
    updateStatus(taskId, newStatus) { }
}