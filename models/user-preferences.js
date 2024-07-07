import mongoose from "mongoose";

const userPreferencesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    data: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    strict: false,
  }
);

export const UserPreference = mongoose.model(
  "userPreferences",
  userPreferencesSchema
);
