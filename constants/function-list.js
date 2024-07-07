import { getCurrentWeather, getForecastWeather } from "../functions/misc.js";
import {
  deletePreference,
  updatePreference,
} from "../functions/preferences.js";
import {
  currentTrack,
  nextSong,
  playTrack,
  randomTrack,
} from "../functions/spotify.js";

export const spotifyFunctionsList = [
  {
    name: "nextSong",
    description:
      "use this function to skip to the next song in the user's spotify queue",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "currentTrack",
    description:
      "use this function to get the currently playing track in the user's spotify queue",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playTrack",
    description: "use this function to search and play a certain track",
    parameters: {
      type: "object",
      properties: {
        track: {
          type: "string",
          description: "the name of the track to search for",
        },
      },
    },
    required: ["track"],
  },
  {
    name: "randomTrack",
    description: "use this function to search and play a random track",
    parameters: {
      type: "object",
      properties: {
        genre: {
          type: "string",
          description:
            "the genre the user has requested for. if no genre requested then default to 'random'. Make sure use proper skewer-case formatting like k-pop, hip-hop.",
        },
      },
    },
    required: ["genre"],
  },
];

export const miscFunctions = [
  {
    name: "getCurrentWeather",
    description:
      "use this function to get the current weather of a city using the weatherapi",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "the name of the city to get the weather of",
        },
      },
    },
    required: ["city"],
  },
  {
    name: "getForecastWeather",
    description:
      "use this function to get the forecast weather of a city using the weatherapi",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "the name of the city to get the weather of",
        },
      },
    },
    required: ["city"],
  },
];

export const preferencesFunctions = [
  {
    name: "updatePreference",
    description:
      "use this function to update the user preferences in the database",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "the key of the preference to update",
        },
        value: {
          type: "string",
          description: "the value of the preference to update",
        },
        content: {
          type: "string",
          description:
            "this is the reply that will be sent to the user. Must not be empty",
        },
      },
    },
    required: ["key", "value", "content"],
  },
  {
    name: "deletePreference",
    description:
      "use this function to delete the user preferences in the database",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "the key of the preference to delete",
        },
        content: {
          type: "string",
          description:
            "this is the reply that will be sent to the user. Must not be empty",
        },
      },
    },
    required: ["key", "content"],
  },
];

export const functions = {
  nextSong: nextSong,
  currentTrack: currentTrack,
  playTrack: playTrack,
  randomTrack: randomTrack,
  getCurrentWeather: getCurrentWeather,
  getForecastWeather: getForecastWeather,
  updatePreference: updatePreference,
  deletePreference: deletePreference,
};
