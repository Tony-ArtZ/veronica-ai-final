export const getCurrentWeather = async (token, username, argumentsJson) => {
  const city = argumentsJson.city;
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${city}&aqi=no`,
      {
        method: "POST",
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
    return {
      role: "assistant",
      content: `${username}, the current weather of ${data.location.name}, ${data.location.region} is ${data.current.condition.text}. The current temperatures are ${data.current.temp_c}°C and it feels like ${data.current.feelslike_c}°C.`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getForecastWeather = async (token, username, argumentsJson) => {
  const city = argumentsJson.city;
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${city}&days=1&aqi=no`,
      {
        method: "POST",
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
    return {
      role: "assistant",
      content: `${username}, the weather tomorrow of ${data.location.name}, ${data.location.region} is ${data.forecast.forecastday[0].day.condition.text}. The chances of rain are ${data.forecast.forecastday[0].day.daily_chance_of_rain}%.`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
