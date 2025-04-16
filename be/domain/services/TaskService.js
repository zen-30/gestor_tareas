export default class TaskService {
    constructor( taskRepository) {
        this.taskRepository = taskRepository
    }

    // Obtiene todas las tareas de un proyecto específico
    getTasksByProjectId(projectId) {
        return this.taskRepository.getAllByProjectId(projectId);
    }

    // Crea una nueva tarea
    createTask({ projectId, title, description = '', tags = [] }) {
        const newTask = {
            id: Date.now(),
            projectId,
            title,
            description,
            tags,
            status: 'pendiente',
        };
        return this.taskRepository.save(newTask);
    }

    // Actualizar el estado de una tarea
    updateTaskStatus(taskId, newStatus) {
        const validStatuses = ['pendiente', 'en_progreso', 'completada'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error('Estado no válido');
        }
        const updatedTask = this.taskRepository.updateStatus(taskId, newStatus);
        if (!updatedTask) {
            throw new Error('Tarea no encontrada');
        }
        return updatedTask;
    }

    // Obtener tareas con tags compartidos entre dos proyectos
    getTasksWithSharedTags(projectAId, projectBId) {
        const tasksA = this.taskRepository.getAllByProjectId(projectAId);
        const tasksB = this.taskRepository.getAllByProjectId(projectBId);
    
        const tagToTasksA = new Map();
        const sharedTasks = new Set();
    
        // Indexar las tareas del proyecto A por tag
        for (const task of tasksA) {
            for (const tag of task.tags) {
                if (!tagToTasksA.has(tag)) {
                    tagToTasksA.set(tag, []);
                }
                tagToTasksA.get(tag).push(task);
            }
        }
    
        // Verificar las tareas del proyecto B
        for (const taskB of tasksB) {
            for (const tag of taskB.tags) {
                const matchingTasksA = tagToTasksA.get(tag);
                if (matchingTasksA) {
                    matchingTasksA.forEach(taskA => sharedTasks.add(taskA));
                    sharedTasks.add(taskB);
                }
            }
        }
    
        return Array.from(sharedTasks);
    }
}
