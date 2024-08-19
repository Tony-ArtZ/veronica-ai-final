import express from "express";
import * as dotenv from "dotenv";
import { verifyAccessToken } from "../utils/jwt-helper.js";
import {
  deletePreferenceHelper,
  getAllPreferences,
} from "../utils/user-prefs-helper.js";
dotenv.config();

const router = express.Router();

router.get("/prefs", verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const userPreferences = await getAllPreferences(userId);
    res.json(userPreferences);
  } catch (err) {
    next(err);
  }
});

router.delete("/prefs/:key", verifyAccessToken, async (req, res, next) => {
  try {
    const key = req.params.key;
    const userId = req.payload.aud;
    const deletePreferenceResult = await deletePreferenceHelper(userId, key);
    res.json(deletePreferenceResult);
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
