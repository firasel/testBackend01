const express = require("express");
const Login = require("../controller/User/Login");
const Register = require("../controller/User/Register");
const Update = require("../controller/User/Update");
const LoginGuard = require("../middleware/LoginGuard");
const router = express.Router();

// User Register
router.post("/register", Register);
// User Login
router.post("/login", Login);
// User Data Update
router.post("/update", LoginGuard, Update);

router.get('/test',(req,res)=>{
    console.log(req.cookies.jwt);
    res.send('true');
})

module.exports = router;
