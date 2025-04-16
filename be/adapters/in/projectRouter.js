import express from 'express';

export default function createProjectRouter(projectService, taskService) {
    const router = express.Router();
    // Obtener todos los proyectos
    router.get('/projects', (req, res) => {
        try {
            const projects = projectService.getProjects();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Obtener tareas por projectId
    router.get('/projects/:projectId/tasks', (req, res) => {
        const { projectId } = req.params;
        try {
            const tasks = taskService.getTasksByProjectId(Number(projectId));
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
