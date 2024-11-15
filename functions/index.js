import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

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

const weatherGroups = {
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

function getWeatherGroup(code) {
  for (const [group, codes] of Object.entries(weatherGroups)) {
    if (codes.includes(code)) {
      return group;
    }
  }
  return "unknown"; // Fallback if code isn't matched
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
