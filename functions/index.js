import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import { API_KEY as localAPIKey } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import {
  AirVent,
  Clock,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react-native";

export const apiKey = localAPIKey || Constants.expoConfig.extra.API_KEY;

export const packageName = Constants.expoConfig?.android?.package;

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
  foggy: [1030, 1063, 1135, 1147], // Foggy/Mist - 'Cloud icon'
  lightPrecipitation: [1063, 1150, 1153, 1180, 1183, 1240, 1204, 1210, 1213], // Light Precipitation - 'Umbrella icon'
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
      console.log(extractCityAndCountry(response.data));

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

export const treeShakeObject = (obj, keysToKeep = [], keysToRemove = []) => {
  const result = {};

  // Add keys to keep
  for (const key of keysToKeep) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  // Add remaining keys if no keys to keep are specified
  if (keysToKeep.length === 0) {
    for (const key in obj) {
      if (!keysToRemove.includes(key)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
};

export function getDayFromEpoch(epochTime) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const date = new Date(epochTime * 1000);

  const today = now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (date.toDateString() === today) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return days[date.getDay()];
}

export function classifyUV(uvIndex) {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
}

export function getHighestValue(obj) {
  if (!obj || typeof obj !== "object") return null;
  return Math.max(...Object.values(obj));
}

export function calculateAQI(airQuality) {
  // Return EPA index if available
  if (airQuality["us-epa-index"]) {
    return {
      value: airQuality["us-epa-index"],
      level: getAQILevel(airQuality["us-epa-index"]),
    };
  }

  // Fallback calculation based on PM2.5 (most common indicator)
  const pm25 = airQuality.pm2_5;
  let aqi = 1;

  if (pm25 <= 12.0) aqi = 1;
  else if (pm25 <= 35.4) aqi = 2;
  else if (pm25 <= 55.4) aqi = 3;
  else if (pm25 <= 150.4) aqi = 4;
  else if (pm25 <= 250.4) aqi = 5;
  else aqi = 6;

  return {
    value: aqi,
    level: getAQILevel(aqi),
  };
}

function getAQILevel(aqi) {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Poor";
    case 4:
      return "Bad";
    case 5:
      return "Very Bad";
    case 6:
      return "Severe";
    default:
      return "N/A";
  }
}

export function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const preferenceIcons = {
  measurement: {
    temperatureUnit: Thermometer,
    windSpeedUnit: Wind,
    timeFormat: Clock,
    precipitationUnit: CloudRain,
  },
  display: {
    airQualityIndex: AirVent,
    uvIndexDisplay: Sun,
  },
  notifications: {
    weatherAlerts: CloudRain,
    dailySummary: Sun,
    rainAlerts: CloudRain,
  },
};

export const preferenceList = {
  measurement: {
    temperatureUnit: {
      label: "Temperature Unit",
      options: ["Celsius", "Fahrenheit"],
    },
    windSpeedUnit: {
      label: "Wind Speed Unit",
      options: ["km/h", "mph", "m/s"],
    },
    timeFormat: {
      label: "Time Format",
      options: ["12-hour", "24-hour"],
      selected: "24-hour",
    },
  },
  display: {
    airQualityIndex: {
      label: "Air Quality Index",
      options: ["Show", "Hide"],
    },
    uvIndexDisplay: {
      label: "UV Index Display",
      options: ["All", "Numeric", "Label"],
    },
  },
  notifications: {
    label: "Notifications",
    options: ["weatherAlerts", "dailySummary", "rainAlerts"],
  },
};

export const calculateUnits = (value, targetUnit, includeUnit = false) => {
  if (!value) return value;
  let result = Math.round(value);

  // Temperature conversions
  if (targetUnit === "Fahrenheit") {
    result = Math.round((value * 9) / 5 + 32);
    return includeUnit ? `${result}°F` : result;
  }
  if (targetUnit === "Celsius") {
    return includeUnit ? `${result}°C` : result;
  }

  // Wind Speed conversions
  if (targetUnit === "mph") {
    result = Math.round(value * 0.621371);
    return includeUnit ? `${result} mph` : result;
  }
  if (targetUnit === "m/s") {
    result = Math.round(value * 0.277778);
    return includeUnit ? `${result} m/s` : result;
  }
  if (targetUnit === "km/h") {
    return includeUnit ? `${result} km/h` : result;
  }

  // Time conversions
  if (targetUnit === "12-hour") {
    const period = value >= 12 ? "PM" : "AM";
    const hour = value % 12 || 12;
    return includeUnit ? `${hour}${period}` : hour;
  }
  if (targetUnit === "24-hour") {
    return includeUnit ? `${result.toString().padStart(2, "0")}h` : result;
  }

  // Precipitation conversions
  if (targetUnit === "in") {
    result = Math.round(value * 0.0393701);
    return includeUnit ? `${result} in` : result;
  }
  if (targetUnit === "mm") {
    return includeUnit ? `${result} mm` : result;
  }

  return result;
};

export const displayUV = (value, display) => {
  if (display === "All") {
    return `${value} (${classifyUV(value)})`;
  }
  if (display === "Numeric") {
    return value;
  }
  if (display === "Label") {
    return classifyUV(value);
  }
};

export const defaultAnimation = (index = 0, FadeIn, FadeInDown) => {
  if (!FadeIn || !FadeInDown) return null;

  const mobileAnimation = FadeInDown.duration(500)
    .withInitialValues({
      transform: [{ translateY: 50 }],
    })
    .delay(index * 30);

  const webAnimation = FadeIn.duration(300);

  return Platform.OS !== "web" ? mobileAnimation : webAnimation;
};
