const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userHandler = require("./routeHandlers/userHandler.js");
const taskHandler = require("./routeHandlers//taskHandler.js");
const SendResponse = require("./controller/SendResponse/SendResponse.js");

const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwdhb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// Routes
app.use("/user", userHandler);

// Routes
app.use("/task", taskHandler);

app.get("/", (req, res) => {
  res.send("Api is worikng");
});

app.listen(port, () => console.log("Server runing is port", port));
