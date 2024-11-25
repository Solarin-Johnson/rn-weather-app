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
    throw error; // Re-throwing the error if needed for handling in the calling code
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
    throw error; // Re-throwing the error if needed for handling in the calling code
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
    throw error; // Re-throwing the error if needed for handling in the calling code
  }
};
