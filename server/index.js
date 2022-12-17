require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes");
const setDatabase = require("./config/database");
const errorHandler = require("./config/errorHandler");

const app = express();

setDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: 5000000 }));
app.use(express.json({ limit: 5000000 }));
app.use(morgan("dev"));
app.use(cookieParser());

// static
app.use(
  "/uploads",
  express.static(path.join(__dirname, ".", "static", "uploads"))
);

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
