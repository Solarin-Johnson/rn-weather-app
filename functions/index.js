import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

import Constants from "expo-constants";
import { API_KEY as localAPIKey } from "@env";
import axios from "axios";
import { Platform } from "react-native";

export const apiKey = localAPIKey || Constants.expoConfig.extra.API_KEY;

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = () => {
  const date = new Date();
  return `${date.getDate().toString().padStart(2, "0")}, ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const dpToPercentage = (dp, dimension) => {
  return dp / dimension;
};

// Mapping weather groups to icon resources

export const weatherGroups = {
  clear: [1000], // Clear/Sunny - 'Sun icon'
  cloudy: [1003, 1006, 1009], // Cloudy/Overcast - 'Partly Cloudy Day icon'
  foggy: [1030, 1135, 1147], // Foggy/Mist - 'Cloud icon'
  lightPrecipitation: [1150, 1153, 1180, 1183, 1240, 1204, 1210, 1213], // Light Precipitation - 'Umbrella icon'
  moderateHeavyPrecipitation: [
    1186, 1189, 1192, 1195, 1243, 1246, 1207, 1216, 1219, 1255, 1222, 1225,
    1258,
  ], // Moderate/Heavy Precipitation - 'Storm icon'
  freezingConditions: [1168, 1171, 1198, 1201], // Freezing Conditions - 'Snow icon'
  thunderstorms: [1087, 1273, 1276, 1279, 1282], // Thunderstorms - 'Lightning Bolt icon'
  icePellets: [1237, 1249, 1261, 1264], // Ice Pellets/Sleet - 'Snowy Sunny Day icon'
};

export function getWeatherGroup(code) {
  for (const [group, codes] of Object.entries(weatherGroups)) {
    if (codes.includes(code)) {
      return group;
    }
  }
  return "clear"; // Fallback if code isn't matched
}

const { width } = Dimensions.get("window");

export const clamp = (min, value, max) => {
  const getValueInPx = (val) => {
    if (typeof val === "string") {
      if (val.includes("%")) {
        // Convert percentage to px relative to screen width
        return (parseFloat(val) / 100) * width;
      } else if (val.includes("px")) {
        // Direct px value
        return parseFloat(val);
      }
    }
    return val; // If it's already a number, assume it's in px
  };

  const minValue = getValueInPx(min);
  const maxValue = getValueInPx(max);
  const valueInPx = getValueInPx(value);

  return Math.max(minValue, Math.min(valueInPx, maxValue));
};

export const getValueInPx = (val, width) => {
  if (typeof val === "string") {
    if (val.includes("%")) {
      return (parseFloat(val) / 100) * width; // Convert percentage to px based on screen width
    } else if (val.includes("px")) {
      return parseFloat(val); // Return the pixel value directly
    } else if (val.includes("vw")) {
      return (parseFloat(val) / 100) * width; // Convert vw to px based on screen width
    }
  }
  return val; // If it's already a number, assume it's in px
};

export function extractCityAndCountry(response) {
  // Initialize variables for city and country
  let city = null;
  let country = null;

  // Loop through the address_components to find the city and country
  for (let component of response.results[0].address_components) {

    if (!city && component.types.includes("political")) {
      city = component.short_name;
    }
    if (!country && component.types.includes("country")) {
      country = component.long_name;
    }
    if (city && country) {
      break; // Exit loop early if both city and country are found
    }
  }

  // Return an object with city and country
  return { city, country };
}

export const getLocation = async (cord) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${apiKey}`
    );
    if (response.data.results.length > 0) {
      return extractCityAndCountry(response.data);
    }
  } catch (error) {
    console.error("Error getting location or address:", error);
  }
};

export const getPlatform = () => {
  return Platform.OS;
};

export const getWords = (str, len = 2) => {
  return str.split(" ").slice(0, len).join(" ");
};
