const authService = require("../services/auth.service");
const { ApiResponse } = require("../../utils/response");
const { asyncHandler } = require("../middlewares/async.middleware");

exports.register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);

  const responseData = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };

  new ApiResponse("User registered successfully", responseData, 201).send(res);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

  const responseData = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };

  new ApiResponse("Login successful", responseData).send(res);
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  new ApiResponse("Profile retrieved successfully", { user }).send(res);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await authService.updateProfile(req.user._id, req.body);

  const responseData = {
    user: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    },
  };

  new ApiResponse("Profile updated successfully", responseData).send(res);
});
