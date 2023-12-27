import { Messages } from "../models/messages.js";

const saveMessage = async (message, role, userId) => {
  try {
    const messageData = new Messages({
      role,
      content: message,
      userId,
      timeStamp: Date.now(),
    });
    await messageData.save();
  } catch (err) {
    throw err;
  }
};

const getMessage = async (limit, userId) => {
  try {
    const messages = await Messages.find({ userId })
    .sort({$natural: -1 })
    .limit(limit)

    messages.reverse();

      return messages;
  } catch (err) {
    throw err;
  }
};

export { saveMessage, getMessage };
