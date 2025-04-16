export default class Task {
    constructor({ id, projectId, title, description = '', status, tags = [] }) {
        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new Error('El id debe ser un número o un string UUID.');
        }
        if (typeof projectId !== 'number' || projectId <= 0) {
            throw new Error('El projectId debe ser un número positivo.');
        }
        if (typeof title !== 'string' || title.trim() === '') {
            throw new Error('El título debe ser un string no vacío.');
        }
        if (description && typeof description !== 'string') {
            throw new Error('La descripción debe ser un string.');
        }
        const validStatuses = ['pendiente', 'en_progreso', 'completada'];
        if (!validStatuses.includes(status)) {
            throw new Error(`El estado debe ser uno de los siguientes: ${validStatuses.join(', ')}.`);
        }
        if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
            throw new Error('Las etiquetas deben ser un array de strings.');
        }

        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.tags = tags;
    }
}
