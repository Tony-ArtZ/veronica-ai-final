import { UserPreference } from "../models/user-preferences.js";

async function addOrUpdatePreferenceHelper(userId, key, value) {
  const result = await UserPreference.findOneAndUpdate(
    { userId: userId },
    { $set: { [`data.${key}`]: value } },
    { new: true, upsert: true }
  );
  return result;
}

async function deletePreferenceHelper(userId, key) {
  const result = await UserPreference.findOneAndUpdate(
    { userId: userId },
    { $unset: { [`data.${key}`]: 1 } },
    { new: true }
  );
  return result;
}

async function getAllPreferences(userId) {
  const userPreferences = await UserPreference.findOne({ userId: userId });
  return userPreferences ? userPreferences.data : null;
}

export {
  addOrUpdatePreferenceHelper,
  deletePreferenceHelper,
  getAllPreferences,
};
