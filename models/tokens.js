import mongoose from "mongoose";

const tokensSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  token: { type: String, required: true }
});

export const TokensStorage = mongoose.model(
  "Tokens",
  tokensSchema
);
