import { nextSong } from "../functions/spotify";

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
];

export const spotifyFunctions = {
  nextSong: nextSong,
};
