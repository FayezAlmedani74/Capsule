const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const setupExpress = (app) => {
  app.use(helmet());
  app.use(xss());
  app.use(mongoSanitize());
  app.use(hpp());

  // CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  app.use(compression());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests from this IP, please try again in 15 minutes",
  });
  app.use("/api", limiter);
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.enable("trust proxy");

  return app;
};

module.exports = setupExpress;
