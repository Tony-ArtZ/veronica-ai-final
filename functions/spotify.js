export const nextSong = async (token, username) => {
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

export const currentTrack = async (token, username) => {
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
