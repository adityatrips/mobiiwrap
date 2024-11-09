const mongoose = require("mongoose");

const connectToDb = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
