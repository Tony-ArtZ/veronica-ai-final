//OpenAI chatCompletion functions and other parameters
import * as dotenv from "dotenv";
import {
  miscFunctions,
  spotifyFunctionsList,
} from "../constants/function-list.js";
dotenv.config();

const openAiConfig = {
  model: "gpt-3.5-turbo",
  functions: [
    {
      name: "sendMessageWithAnimation",
      description:
        "Use this often instead of normal replies. send a reply while doing an animation along with it. for example replying to hi with a message and 'greet' animation",
      parameters: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description:
              "this is the reply that will be sent to the user. Must not be empty",
          },
          animationName: {
            type: "string",
            description:
              "name of animation to perform. Possible values are only ['Laughing', 'Greet', 'Thank', 'Sad', 'Angry', 'Disappointed' and 'Happy']",
          },
        },
      },
      required: ["content", "animationName"],
    },
    ...spotifyFunctionsList,
    ...miscFunctions,
  ],
};

export default openAiConfig;
