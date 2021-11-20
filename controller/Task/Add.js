const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const SendResponse = require("../SendResponse/SendResponse");

const Add = async (req, res) => {
  try {
    const { title = undefined, status } = req.body;
    // Check user is available and right data provide
    if (res.locals.email && title !== "" && typeof title === "string") {
      const email = res.locals.email;
      // Add a task in database
      const taskAdd = await Users.updateOne(
        { email },
        {
          $push: {
            tasks: {
              $each: [{ title, status }],
            },
          },
        }
      );

      if (taskAdd?.modifiedCount > 0) {
        res.status(200).send(SendResponse(true, "Task added Successfull"));
      } else if (foodDataInsert?.matchedCount === 0) {
        res.status(404).send(SendResponse(false, "User Not Found"));
      } else {
        res.status(404).send(SendResponse(false, "Task not added"));
      }
    } else {
      res.status(500).send(SendResponse(false, "Internal Server Error"));
    }
  } catch (error) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = Add;
