export const getCurrentWeather = async ({ token, username, argumentsJson }) => {
  try {
    const city = JSON.parse(argumentsJson).city;
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${city}&aqi=no`,
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
export const getForecastWeather = async ({
  token,
  username,
  argumentsJson,
}) => {
  try {
    const city = JSON.parse(argumentsJson).city;
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${city}&days=1&aqi=no`,
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

export const orderPizza = async ({ token, username, argumentsJson }) => {
  try {
    console.log("Ordering pizza");
    const response = await fetch(
      "https://1946-2a09-bac1-36c0-60-00-10d-2a.ngrok-free.app/trigger-order",
      {
        method: "POST",
        body: JSON.stringify({
          passcode: "pizzapizza",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    console.log(data);

    if (!data.success) {
      return {
        role: "assistant",
        content: `Sorry ${username}, something went wrong !`,
        animation: "Disappointed",
      };
    }

    return {
      role: "assistant",
      content: `${username}, your pizza is on the way!`,
      animation: "Happy",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
