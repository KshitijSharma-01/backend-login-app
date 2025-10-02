const { signup, login } = require("../Controllers/AuthController.js");
const { signupValidation, loginValidation } = require("../MiddleWares/AuthValidation.js");

const router = require("express").Router()

router.post("/signup", signupValidation, signup)
router.post("/login", loginValidation, login)

module.exports = router;