// Repositorio para guardar las tareas en memoria
export default class TaskRepository {
    constructor() {
        this.tasks = [];
    }

    getAllByProjectId(projectId) {
        return this.tasks.filter(task => task.projectId === projectId);
    }

    save(task) {
        this.tasks.push(task);
        return task;
    }

    updateStatus(taskId, newStatus) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            return task;
        }
        return null;
    }
}