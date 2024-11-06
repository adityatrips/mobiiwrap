const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectToDb = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
    logger.success("Connected to MongoDB");
  } catch (error) {
    logger.error(error);
  }
};

module.exports = connectToDb;
