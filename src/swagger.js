const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO API',
      version: '1.0.0',
      description: 'API documentation for the TODO application',
    },
    servers: [
      {
        url: 'http://localhost:8001/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            password: {
              type: 'string',
              description: 'User password',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Todo: {
          type: 'object',
          required: ['user_id', 'title'],
          properties: {
            id: {
              type: 'string',
              description: 'Todo ID',
            },
            user_id: {
              type: 'string',
              description: 'User ID',
            },
            title: {
              type: 'string',
              description: 'Task title',
            },
            description: {
              type: 'string',
              description: 'Task description',
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed'],
              description: 'Task status',
            },
            priority: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
              description: 'Task priority',
            },
            due_date: {
              type: 'string',
              format: 'date',
              description: 'Due date',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
      },
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
