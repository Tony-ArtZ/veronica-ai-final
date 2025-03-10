import express from "express";
import * as dotenv from "dotenv";
import { verifyAccessToken } from "../utils/jwt-helper.js";
import { getResponseFromAI } from "../utils/openai-helper.js";
import { Messages } from "../models/messages.js";
import { getMessage, saveMessage } from "../utils/messages-helper.js";
import { getPromptObject } from "../utils/prompt.js";
import { sendMessageWithAnimation } from "../functions/animation.js";
import { functions } from "../constants/function-list.js";
import { getAllPreferences } from "../utils/user-prefs-helper.js";
dotenv.config();

const router = express.Router();

//Main Route for getting Response
router.post("/", verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const userName = req.payload.userName;
    const { message } = req.body;
    const { spotifyToken } = req.body;

    //Save the current message
    await saveMessage(
      message +
        " [User's Time: " +
        req.body.localTime.split(" ")[1] +
        " Date: " +
        req.body.localTime.split(" ")[0] +
        " ]",
      "user",
      userId,
    );

    //Get list of previous messages
    const messages = await getMessage(4, userId);
    const messagesModified = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    //Get the preferences of the user
    const userPreferences = await getAllPreferences(userId);

    //Messages history with prompt attached
    const prompt = getPromptObject(userName, userPreferences);
    const messageWithPrompt = [prompt, ...messagesModified];

    //Get response from API
    const response = await getResponseFromAI(messageWithPrompt);

    let responseMessage = response.choices[0].message;

    //Add Animation to response
    if (responseMessage.function_call?.name === "sendMessageWithAnimation") {
      responseMessage = sendMessageWithAnimation(
        responseMessage.function_call.arguments,
      );
    } else if (responseMessage.function_call) {
      console.log(responseMessage.function_call);
      responseMessage = await functions[responseMessage.function_call.name]({
        userId,
        token: spotifyToken,
        username: userName,
        argumentsJson: responseMessage.function_call.arguments,
      });
    }
    //Save the response in Database
    await saveMessage(responseMessage.content, responseMessage.role, userId);
    res.json(responseMessage);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Get previously stored messages of a certain user
router.get("/getmessage", verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const messages = await getMessage(4, userId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post("/postmessage", verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const timeStamp = Date.now();
    const message = new Messages({
      role: "user",
      content: req.body.message,
      userId,
      timeStamp,
    });
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch (err) {
    next(err);
  }
});

export { router as messageRouter };
