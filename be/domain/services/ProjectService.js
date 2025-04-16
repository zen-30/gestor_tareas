export default class ProjectService {

    constructor(projectRepository) {
        this.projectRepository = projectRepository
    }

    // Obtener todos los proyectos
    getProjects() {
        return this.projectRepository.getAll();
    }
}