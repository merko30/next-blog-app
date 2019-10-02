if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");

const router = require("./routes");
const middlewares = require("./config/middlewares");
const setDatabase = require("./config/database");
const errorHandler = require("./config/errorHandler");

console.log(process.env);

const app = express();

middlewares(app);
setDatabase();

app.use("/api", router);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  //set stati folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
