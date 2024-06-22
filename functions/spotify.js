export const nextSong = async (token, username) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Error in skipping the song");
    }
    return {
      role: "assistant",
      content: `Skipping to the next song ${username} !`,
    };
  } catch (err) {
    throw err;
  }
};
