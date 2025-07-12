const { env } = require("./env");

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    dialect: "postgres",
    logging: false, // SQL logs
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      family: 4,
    },
  },
};
