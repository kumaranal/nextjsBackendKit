import swaggerJsDoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for my Next.js application",
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
    ],
  },
  apis: ["./src/app/api/**/*.ts"], // Path to your API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
