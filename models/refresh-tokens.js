import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export const RefreshTokenStorage = mongoose.model(
  "refreshTokens",
  refreshTokenSchema
);
