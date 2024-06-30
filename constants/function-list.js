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
            "the genre the user has requested for. if no genre requested then default to 'random'",
        },
      },
    },
    required: ["genre"],
  },
];

export const functions = {
  nextSong: nextSong,
  currentTrack: currentTrack,
  playTrack: playTrack,
  randomTrack: randomTrack,
};
