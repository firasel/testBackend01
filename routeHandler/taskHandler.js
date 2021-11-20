const express = require("express");
const Add = require("../controller/Task/add");
const Get = require("../controller/Task/Get");
const Update = require("../controller/Task/Update");
const router = express.Router();
const LoginGuard = require("../middleware/LoginGuard");

// Add a task
router.post("/add", LoginGuard, Add);
// Update task status
router.post("/update", LoginGuard, Update);
// Get task
router.get("/get", LoginGuard, Get);

module.exports = router;
