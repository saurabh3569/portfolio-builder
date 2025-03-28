require("dotenv").config();
const connectDB = require("./config/db");
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

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
