const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Portfolio API",
    description: "API documentation for portfolio management system",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    // { name: "Auth", description: "Authentication related APIs" },
    // { name: "Portfolio", description: "APIs related to user portfolio" },
    // { name: "Education", description: "APIs related to user education" },
    // { name: "Experience", description: "APIs related to user work experience" },
    // { name: "Skill", description: "APIs related to user skills" },
    // { name: "Project", description: "APIs related to user projects" },
    // { name: "Social Link", description: "APIs related to user social links" },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/v1/index.js"]; // Path to your main router

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger JSON file generated!");
});
