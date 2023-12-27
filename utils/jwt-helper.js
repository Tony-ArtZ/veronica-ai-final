import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import chalk from "chalk";
import createHttpError from "http-errors";
dotenv.config();

//Create new Access Token
const signAccessToken = (userId, userName) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userName,
    };

    const secret = process.env.SECRET;
    const options = {
      expiresIn: "1h",
      issuer: "veronica-ai",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(chalk.blueBright(err.message));
        return reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
};

//Create new Refresh Token
const signRefreshToken = (userId, userName) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userName,
    };

    const secret = process.env.REFRESH_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "veronica-ai",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(chalk.blueBright(err.message));
        return reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
};

//Middleware to protect routes with Access Tokens
const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  JWT.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createHttpError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

//Function to verify Refresh Tokens when issuing new Access Token
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.REFRESH_SECRET, (err, payload) => {
      if (err) return reject(createHttpError.Unauthorized(message));
      const userId = payload.aud;
      const userName = payload.userName;
      resolve({ userId, userName });
    });
  });
};

export {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
