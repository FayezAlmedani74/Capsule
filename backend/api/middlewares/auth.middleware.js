const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../utils/errors");
const UserModel = require("../models/user.model");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError("Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Authentication failed"));
  }
};
