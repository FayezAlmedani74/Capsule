const express = require("express");
const connectDB = require("./config/database");
const setupExpress = require("./config/express");
const routes = require("./api/routes");
const logger = require("./utils/logger");

const app = express();

setupExpress(app);
app.use("/api", routes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
