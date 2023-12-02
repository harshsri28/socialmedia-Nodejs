require("./database/databaseConnection");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const logger = require("./config/winstonConfig");
const routes = require("./src/userDetails/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
const port = process.env.PORT;

app.listen(port, (error, data) => {
  if (error) {
    logger.error("server error occured", error);
  }
  logger.info(`server is running on port ${port}`);
});
