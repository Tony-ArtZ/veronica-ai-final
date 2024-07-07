import {
  addOrUpdatePreferenceHelper,
  deletePreferenceHelper,
} from "../utils/user-prefs-helper.js";

const updatePreference = async ({ userId, token, username, argumentsJson }) => {
  try {
    const { key, value, content } = JSON.parse(argumentsJson);
    const result = await addOrUpdatePreferenceHelper(userId, key, value);
    return {
      role: "assistant",
      content: content,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deletePreference = async ({ userId, token, username, argumentsJson }) => {
  try {
    const { key, content } = JSON.parse(argumentsJson);
    const result = await deletePreferenceHelper(userId, key);
    return {
      role: "assistant",
      content: content,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { updatePreference, deletePreference };
