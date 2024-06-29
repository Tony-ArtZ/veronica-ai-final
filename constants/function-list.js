import { currentTrack, nextSong, playTrack } from "../functions/spotify.js";

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
];

export const functions = {
  nextSong: nextSong,
  currentTrack: currentTrack,
  playTrack: playTrack,
};
