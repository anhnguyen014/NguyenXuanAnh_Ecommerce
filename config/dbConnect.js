const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("DATABASE ERROR");
  }
};

module.exports = dbConnect;
