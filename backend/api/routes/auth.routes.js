const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  validateRegistration,
  validateLogin,
} = require("../validators/auth.validator");
const { rateLimiter } = require("../middlewares/rateLimiter.middleware");

const router = express.Router();

router.post(
  "/register",
  rateLimiter,
  validateRegistration,
  authController.register
);

router.post("/login", rateLimiter, validateLogin, authController.login);

module.exports = router;
