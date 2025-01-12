const UserModel = require("../models/user.model");
const { ValidationError } = require("../../utils/errors");
const logger = require("../../utils/logger");

class AuthService {
  async register(userData) {
    try {
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new ValidationError("Email already exists");
      }

      const user = new UserModel(userData);
      await user.save();

      const token = user.generateAuthToken();
      return { user, token };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ValidationError("Invalid credentials");
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new ValidationError("Invalid credentials");
      }

      const token = user.generateAuthToken();
      return { user, token };
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  }
}

module.exports = new AuthService();
