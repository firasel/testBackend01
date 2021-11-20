const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const SendResponse = require("../SendResponse/SendResponse");

const GetTask = async (req, res) => {
  try {
    // Check user is available
    if (res.locals.email) {
      const { status = false } = req.query;
      const email = res.locals.email;
      let allTask;

      if (status) {
        // Provide all task data
        allTask = await Users.find({ email }, { tasks: 1, _id: 0 });
        allTask = allTask[0]?.tasks;
      } else {
        // Provide todo and inprogress task data
        allTask = await Users.find({ email }, { tasks: 1, _id: 0 });
        allTask = allTask[0]?.tasks.filter((data) => data.status !== "done");
      }

      if (allTask.length > 0) {
        res
          .status(200)
          .send(SendResponse(true, "Task get Successfull", allTask));
      } else {
        res.status(404).send(SendResponse(false, "Task not found"));
      }
    } else {
      res.status(500).send(SendResponse(false, "Internal Server Error"));
    }
  } catch (error) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = GetTask;
