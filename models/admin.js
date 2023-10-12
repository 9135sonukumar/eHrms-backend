const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      require: [true, "Name is required"],
      unique: true,
      minLength: 10,
    },
    userTypeId: {
      type: Number,
      require: [true, "UserTypeId is required"],
    },
    userTypeName: {
      type: String,
      require: [true, "UserTypeName is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

module.exports = model("Admin", adminSchema);
