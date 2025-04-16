export const projects = [
    { "id": 1, "name": "Proyecto Alpha" },
    { "id": 2, "name": "Proyecto Beta" },
    { "id": 3, "name": "Proyecto Gamma" }
];
export const tasks = [
    {
        "id": 101,
        "projectId": 1,
        "title": "Configurar entorno de desarrollo",
        "description": "Instalar Node, Nuxt, y dependencias",
        "status": "completada",
        "tags": ["setup", "backend", "frontend"]
    },
    {
        "id": 102,
        "projectId": 1,
        "title": "Crear modelo de datos",
        "description": "",
        "status": "en_progreso",
        "tags": ["backend", "database"]
    },
    {
        "id": 103,
        "projectId": 1,
        "title": "Implementar API REST - Proyectos",
        "description": "Endpoints GET",
        "status": "pendiente",
        "tags": ["backend", "api"]
    },
    {
        "id": 201,
        "projectId": 2,
        "title": "Diseñar vistas principales",
        "description": "Mockups para lista y detalle",
        "status": "completada",
        "tags": ["frontend", "design"]
    },
    {
        "id": 202,
        "projectId": 2,
        "title": "Desarrollar componente Lista Tareas",
        "description": "Componente Vue reutilizable",
        "status": "en_progreso",
        "tags": ["frontend", "vue", "component"]
    },
    {
        "id": 203,
        "projectId": 2,
        "title": "Integrar API Tareas en vista",
        "description": "Llamadas a GET y PATCH",
        "status": "pendiente",
        "tags": ["frontend", "api", "integration"]
    },
    {
        "id": 204,
        "projectId": 2,
        "title": "Añadir filtro por tags",
        "description": "Funcionalidad extra en frontend",
        "status": "pendiente",
        "tags": ["frontend", "feature"]
    },
    {
        "id": 301,
        "projectId": 3,
        "title": "Investigar optimización de queries",
        "description": "",
        "status": "pendiente",
        "tags": ["backend", "performance", "database"]
    }
]