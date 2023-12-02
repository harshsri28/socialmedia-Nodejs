require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../config/winstonConfig");

async function connectToMongoDB() {
  try {
    const mongoURI = process.env.MONGO_URL;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB successfully!");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

module.exports = mongoose.connection;
