require("dotenv").config();
const db = require("./models/index");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/errorHandler");
const swaggerFile = require("./swagger/swagger-output.json");
const { connectQueue } = require("./utils/rabbitmq");
const worker = require("./utils/emailWorker");
const { env } = require("./config/env");

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

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to PostgreSQL via Sequelize
    await db.sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");

    // Sync models (optional: pass { alter: true } or { force: true } in dev)
    await db.sequelize.sync({ alert: true });
    console.log("✅ Sequelize models synced");

    // Start server
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
    process.exit(1);
  }
};

startServer();
