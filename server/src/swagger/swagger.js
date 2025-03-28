const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Portfolio API",
    description: "API documentation for portfolio management system",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Enter your Bearer token in the format **Bearer &lt;token&gt;**",
    },
  },
  security: [{ BearerAuth: [] }], // Apply BearerAuth globally
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/v1/index.js"]; // Path to your main router

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger JSON file generated!");
});
