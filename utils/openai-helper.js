import OpenAI from "openai";
import * as dotenv from "dotenv";
import openAiConfig from "./openai-config.js";
dotenv.config();

const openAIHelper = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getResponseFromAI = async (messages) => {
  try {
    const response = await openAIHelper.chat.completions.create({
      messages,
      ...openAiConfig,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export { getResponseFromAI };
