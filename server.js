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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
