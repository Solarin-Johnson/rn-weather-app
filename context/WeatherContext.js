import React, { createContext, useState, useEffect, useContext } from "react";
import { useUser } from "./UserContext";
import { getCurrentWeather, getFutureWeather } from "../api";
import { ActivityIndicator } from "react-native";
import { useTheme } from "./ThemeContext";
import { Screen } from "../components/Screens";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [currentWeatherLoc, setCurrentWeatherLoc] = useState(null);
  const { themeColors } = useTheme();
  const { location } = useUser();

  const fetchWeather = async () => {
    if (location) {
      getFutureWeather(location.latitude, location.longitude)
        .then((data) => {
          setFutureWeather(data.forecast);
          setCurrentWeather(data.current);
          setCurrentWeatherLoc(data.location);
        })
        .catch((error) =>
          console.error("Error fetching future weather:", error)
        );
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // Update every 10 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, [location]);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  if (currentWeather === null || location === null)
    return (
      <Screen
        styles={{
          flex: 1,
          justifyContent: "center",
        }}
        fixed
      >
        <ActivityIndicator size={"large"} color={themeColors?.primary} />
      </Screen>
    );

  return (
    <WeatherContext.Provider
      value={{ currentWeather, futureWeather, currentWeatherLoc }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { WeatherContext, WeatherProvider, useWeather };
