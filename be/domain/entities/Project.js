export default class Project {
    constructor({ id, name }) {
        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new Error('El id debe ser un número o un string UUID.');
        }
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('El nombre del proyecto debe ser un string no vacío.');
        }

        this.id = id;
        this.name = name;
    }
}
