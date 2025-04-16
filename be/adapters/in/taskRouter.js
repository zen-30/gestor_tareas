import express from 'express';

export default function createTaskRouter(taskService) {
    const router = express.Router();

    // Crear una nueva tarea
    router.post('/tasks', (req, res) => {
        let { projectId, title, description, tags } = req.body;
        projectId = Number(projectId);
        try {
            const newTask = taskService.createTask({ projectId, title, description, tags });
            res.status(201).json(newTask);
        } catch (error) {
            res.json({ error: error.message });
        }
    });

    // Actualizar el estado de una tarea
    router.patch('/tasks/:taskId', (req, res) => {
        const { taskId } = req.params;
        const { status } = req.body;
        try {
            const updatedTask = taskService.updateTaskStatus(Number(taskId), status);
            res.json(updatedTask);
        } catch (error) {
            res.json({ error: error.message });
        }
    });

    // Obtener tareas con tags compartidos entre dos proyectos
    router.get('/tasks/with-shared-tags', (req, res) => {
        const { projectAId, projectBId } = req.query;

        if (!projectAId || !projectBId) {
            return res.json({ error: 'Se requieren projectAId y projectBId como parámetros de consulta.' });
        }

        try {
            const tasksWithSharedTags = taskService.getTasksWithSharedTags(Number(projectAId), Number(projectBId));
            res.json(tasksWithSharedTags);
        } catch (error) {
            res.json({ error: error.message });
        }
    });

    return router;
}
