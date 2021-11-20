const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");
const SendResponse = require("../SendResponse/SendResponse");

const Register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check User email is already exist or not
    const userDataFind = await Users.findOne({ email }, { _id: 1 });

    if (userDataFind) {
      res.status(409).send(SendResponse(false, "Email is Already Used"));
    } else {
      // hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert data in database
      const userInsert = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      userInsert.save((err) => {
        if (err) {
          res
            .status(400)
            .send(
              SendResponse(
                false,
                "Please try again, Registration Not Successful"
              )
            );
        } else {
          res
            .status(200)
            .send(SendResponse(true, "User registered successful"));
        }
      });
    }
  } catch (error) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = Register;
