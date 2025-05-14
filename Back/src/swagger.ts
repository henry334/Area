import * as swaggerJsdoc from 'swagger-jsdoc'; // Import swaggerJsdoc

const swaggerOptions = {
  swaggerDefinition: {
      swagger:	"2.0",
      info: {
        title: 'Tits API Docs',
        version: '1.0.0',
        description: 'API Documentation for Tits Api',
        termsOfService:"http://swagger.io/terms/",
        contact:{"email":"jeremy.claramonte@epitech.eu"},
      },
      schemes:["http"],
      securityDefinitions:{"authorization":{"type":"apiKey","name":"authorization","in":"header"}},
      tags: [
        {
          name: 'Task',
          description: 'Operations related to tasks'
        },
        {
          name: 'Auth',
          description: 'Operations related to authentication'
        },
        {
          name: 'Oauth2',
          description: 'Operations related to Oauth2'
        },
        {
          name: 'Actrig',
          description: 'Operation related to creating Action and Trigger'
        },
        {
          name: 'Admin',
          description: 'Operation related to admin'
        }
      ],
      basePath: '/',
    },
  apis: ['**/*.ts'],
}

const specs = swaggerJsdoc(swaggerOptions);

export function swaggerDoc() {
    return specs
}
  