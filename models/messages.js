import mongoose from "mongoose";

const messagesScheme = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

export const Messages = mongoose.model("message", messagesScheme);
