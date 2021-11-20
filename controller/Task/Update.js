const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const SendResponse = require("../SendResponse/SendResponse");

const Update = async (req, res) => {
  try {
    const { status = undefined, taskId = undefined } = req.body;
    // Check user is available
    if (res.locals.email && taskId && status) {
      const email = res.locals.email;
      // Add a task in database
      const taskUpdate = await Users.updateOne(
        { email, "tasks._id": taskId },
        {
          $set: {
            "tasks.$.status": status,
          },
        }
      );

      if (taskUpdate?.modifiedCount > 0) {
        res.status(200).send(SendResponse(true, "Task Update Successfull"));
      } else if (taskUpdate?.matchedCount === 0) {
        res.status(404).send(SendResponse(false, "User/task Not Found"));
      } else {
        res.status(404).send(SendResponse(false, "Task not update, try again"));
      }
    } else {
      res.status(500).send(SendResponse(false, "Internal Server Error"));
    }
  } catch (error) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = Update;
