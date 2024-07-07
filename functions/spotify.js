import { genreList, getRandomGenre } from "../constants/genre.js";

export const nextSong = async ({ token, username, argumentsJson }) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 204) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    return {
      role: "assistant",
      content: `Skipping to the next song ${username} !`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const currentTrack = async ({ token, username, argumentsJson }) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    const data = await response.json();
    if (data.item) {
      return {
        role: "assistant",
        content: `Currently playing ${data.item.name} by ${data.item.artists[0].name} !`,
      };
    }
    return {
      role: "assistant",
      content: `No music is currently playing ${username} !`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const playTrack = async ({ token, username, argumentsJson }) => {
  try {
    const { track } = JSON.parse(argumentsJson);
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${track}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (searchResponse.status !== 200) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    const searchData = await searchResponse.json();
    if (searchData.tracks.items.length === 0) {
      return {
        role: "assistant",
        content: `Sorry ${username}, I couldn't find the track !`,
        animation: "Disappointed",
      };
    }
    const trackUri = searchData.tracks.items[0].uri;

    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });
    if (response.status !== 204) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    return {
      role: "assistant",
      content: `Playing ${searchData.tracks.items[0].name} by ${searchData.tracks.items[0].artists[0].name} ${username} !`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const randomTrack = async ({ token, username, argumentsJson }) => {
  try {
    const { genre } = JSON.parse(argumentsJson);
    let selectedGenre = genre;
    if (genre === "random" || !genreList.includes(genre)) {
      selectedGenre = getRandomGenre();
    } else {
      selectedGenre = genre;
    }

    const searchResponse = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${selectedGenre}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (searchResponse.status !== 200) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    const searchData = await searchResponse.json();
    if (searchData.tracks.length === 0) {
      return {
        role: "assistant",
        content: `Sorry ${username}, I couldn't find the track !`,
        animation: "Disappointed",
      };
    }
    const trackUri = searchData.tracks[0].uri;

    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });
    if (response.status !== 204) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }
    return {
      role: "assistant",
      content: `Playing a random track from ${genre} genre ${username} !`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
