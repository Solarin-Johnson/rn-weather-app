import { WEATHER_API_KEY as localWeatherApiKey } from "@env";
import axios from "axios";

export const weatherApiKey =
  localWeatherApiKey || Constants.expoConfig.extra.WEATHER_API_KEY;

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: weatherApiKey,
          q: `${lat},${lon}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // throw error; // Re-throwing the error if needed for handling in the calling code
  }
};

export const getFutureWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: weatherApiKey,
          q: `${lat},${lon}`,
          days: 3,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching future weather data:", error);
    // throw error; // Re-throwing the error if needed for handling in the calling code
  }
};

export const getLocation = async ({ latitude, longitude }) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: weatherApiKey,
          q: `${latitude},${longitude}`,
        },
      }
    );
    // console.log(response.data.location);

    return response.data.location;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // throw error; // Re-throwing the error if needed for handling in the calling code
  }
};

export function getNextHoursWeather(forecastData, dateString, length = 2) {
  const now = toEpoch(dateString);
  const next3Hours = [];

  // Loop through the forecast data (next 3 days or however many available)
  for (let day of forecastData.forecastday) {
    for (let hour of day.hour) {
      const hourEpoch = toEpoch(hour.time); // Convert time_epoch to milliseconds
      // console.log(extractTime(now), (hourEpoch));

      // Add the hour if it's in the future (greater than now) and we're collecting the next 3 hours
      if (hourEpoch > now && next3Hours.length < length) {
        next3Hours.push(hour);
        // console.log("hour", hour, length);
      }

      // Stop once we have 3 hours
      if (next3Hours.length === length) {
        return next3Hours;
      }
    }
  }

  return next3Hours;
}

export const extractTime = (time) => {
  const date = new Date(time * 1000);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

export function toEpoch(datetime) {
  return Math.floor(new Date(datetime.replace(" ", "T")).getTime() / 1000);
}
