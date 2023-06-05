const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

// test route to verify if our middleware is working
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
