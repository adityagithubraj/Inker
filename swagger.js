const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0', 
  info: {
    title: 'API Documentation', 
    version: '1.0.0', 
    description: 'API documentation for the Node.js server', 
  },
  servers: [
    {
      url: 'http://localhost:5000', 
      description: 'Development server',
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
