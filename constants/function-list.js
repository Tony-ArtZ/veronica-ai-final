import { currentTrack, nextSong } from "../functions/spotify.js";

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
];

export const functions = {
  nextSong: nextSong,
  currentTrack: currentTrack,
};
