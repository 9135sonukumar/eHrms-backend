const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.LOCAL_CONNECTION_STRING);
    console.log("DB Host ====>>>", connect.connection.host);
    console.log("DB Name ====>>>", connect.connection.name);
  } catch (error) {
    console.log("dbConnection Error===>>", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
