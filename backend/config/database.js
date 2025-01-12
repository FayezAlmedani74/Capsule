const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
