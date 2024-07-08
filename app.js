import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.js";
import { messageRouter } from "./routes/message.js";
import { spotifyRouter } from "./routes/spotify-auth.js";
import { userRouter } from "./routes/user.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const maxMessageAmount = process.env.MESSAGE_MEMORY || 10;

//Middleware Helpers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

//Auth Route
app.use("/auth", authRouter);

//Spotify Auth Route
app.use("/spotify", spotifyRouter);

//Messages Route
app.use("/", messageRouter);

app.use("/user", userRouter);

//URL Encoded data to JSON Body data Converter
app.use((req, res, next) => {
  if (req.is("application/x-www-form-urlencoded")) {
    req.body = req.body || {};
    for (let key in req.query) {
      req.body[key] = req.query[key];
    }
  }
  next();
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//Initialization
app.listen(port, () => console.log(`Listening on port ${port}`));
await mongoose.connect(process.env.MONGO_DB);
