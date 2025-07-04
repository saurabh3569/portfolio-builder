const mongoose = require("mongoose");
const { env } = require("./env");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
