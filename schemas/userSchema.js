const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide your email"],
    },
    password: {
      type: String,
      required: [true, "Please Provide your password"],
    },
    tasks: [
      {
        title: {
          type: String,
          required: [true, "Please Provide a title"],
        },
        status: {
          type: String,
          enum: ["todo", "inprogress", "done"],
          default: "todo",
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = userSchema;
