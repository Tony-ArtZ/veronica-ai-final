import express from "express";
import { User } from "../models/user.js";
import {
  saveRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt-helper.js";
import createHttpError from "http-errors";

const router = express.Router();

//Registration
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.userName || !data.email || !data.password)
      throw new Error("Invalid parameters");

    const userExists = await User.findOne({ email: data.email });
    if (userExists) throw new Error("Email is already in use");

    const user = new User({
      userName: data.userName,
      email: data.email,
      password: data.password,
    });

    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id, savedUser.userName);
    const refreshToken = await signRefreshToken(
      savedUser.id,
      savedUser.userName
    );
    await saveRefreshToken(savedUser.id, refreshToken);

    res.json({ message: "success", accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

//Login
router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.email || !data.password) throw new Error("Invalid parameters");

    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("User not registered");

    const passwordMatch = await user.isValidPassword(data.password);
    if (!passwordMatch) throw new Error("Email or password was incorrect");

    const accessToken = await signAccessToken(user.id, user.userName);
    const refreshToken = await signRefreshToken(user.id, user.userName);
    await saveRefreshToken(user.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

//Get new Access Token
router.post("/refreshtoken", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();

    const { userId, userName } = await verifyRefreshToken(refreshToken);
    //Remove old refreshToken
    await RefreshTokenStorage.deleteOne({ refreshToken });

    //Create and save new refreshToken
    const accessToken = await signAccessToken(userId, userName);
    const newRefreshToken = await signRefreshToken(userId, userName);

    await saveRefreshToken(userId, newRefreshToken);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

export { router as authRouter };
