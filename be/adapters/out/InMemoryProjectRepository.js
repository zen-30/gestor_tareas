// Repositorio para guardar los proyectos en memoria
export default class ProjectRepository {
    constructor() {
        this.projects = [];
    }

    getAll() {
        return this.projects
    }
}