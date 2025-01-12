const express = require("express");
const authRoutes = require("./auth.routes");
const capsuleRoutes = require("./capsule.routes");
const { errorHandler } = require("../middlewares/error.middleware");

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
  });
});

// API routes
router.use("/auth", authRoutes);
router.use("/capsules", capsuleRoutes);

// 404 handler
router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
router.use(errorHandler);

module.exports = router;
