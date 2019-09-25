require("dotenv").config();
const express = require("express");

const router = require("./routes");
const middlewares = require("./config/middlewares");
const setDatabase = require("./config/database");
const errorHandler = require("./config/errorHandler");

const app = express();

middlewares(app);
setDatabase();

app.use("/api", router);

app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
