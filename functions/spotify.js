export const nextSong = async (token) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      return {
        message:
          "It seems there might have been some error, make sure to authorize spotify and try again",
      };
    }
  } catch (err) {
    throw err;
  }
};
