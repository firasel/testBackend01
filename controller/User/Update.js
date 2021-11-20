const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const Update = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    // Verify token and get the email
    const userEmail = res.locals.email;
    // Check posting email and jwt stored email
    if (email === userEmail) {
      // Update the user data
      const dataUpdate = await Users.updateOne(
        { email: userEmail },
        {
          $set: {
            firstName,
            lastName,
          },
        }
      );
      if (dataUpdate.modifiedCount > 0) {
        res
          .status(200)
          .send(SendResponse(true, "User Data Updated Successfull"));
      } else if (dataUpdate.matchedCount === 0) {
        res.status(404).send(SendResponse(false, "User Not Found"));
      } else {
        res
          .status(404)
          .send(SendResponse(false, "User Data Update Not Success"));
      }
    } else {
      res.status(404).send(SendResponse(false, "User Data Update Not Success"));
    }
  } catch (error) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = Update;
