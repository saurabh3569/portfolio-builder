const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/errorHandler");
const swaggerFile = require("./swagger/swagger-output.json");

const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Gzip compression
app.use(compression());

// Parse JSON bodies
app.use(express.json());

// HTTP request logger
app.use(morgan("combined"));

// Swagger API docs
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use("/v1", routes);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
