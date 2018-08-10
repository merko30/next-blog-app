import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import morgan from "morgan";
import routes from "./routes.mjs";
dotenv.config({ silent: true });

const app = express();

mongoose.connect(process.env.DB);
mongoose.connection.once("open", () => {
  console.log("Connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Passport

import passportConfig from "./config/passport.mjs";
app.use(passport.initialize());
passportConfig(passport);

app.use(morgan("dev"));

app.use("/api", routes);

app.listen(5000 || process.env.PORT, () => {
  console.log("App running...");
});
