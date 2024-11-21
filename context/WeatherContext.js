import React, { createContext, useState, useEffect, useContext } from "react";
import { useUser } from "./UserContext";
import { getCurrentWeather, getFutureWeather } from "../api";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const { location } = useUser();

  useEffect(() => {
    // Fetch current weather data
    if (location) {
      // getCurrentWeather(location.latitude, location.longitude)
      //   .then((data) => setCurrentWeather(data))
      //   .catch((error) =>
      //     console.error("Error fetching current weather:", error)
      //   );

      getFutureWeather(location.latitude, location.longitude)
        .then((data) => {
          setFutureWeather(data.forecast);
          setCurrentWeather(data.current);
        })
        .catch((error) =>
          console.error("Error fetching future weather:", error)
        );

      // Fetch future weather data
      //   const fetchFutureWeather = async () => {
      //     try {
      //       const response = await fetch("API_URL_FOR_FUTURE_WEATHER");
      //       const data = await response.json();
      //       setFutureWeather(data);
      //     } catch (error) {
      //       console.error("Error fetching future weather:", error);
      //     }
      //   };

      //   fetchCurrentWeather();
      //   fetchFutureWeather();
    }
  }, [location]);

  return (
    <WeatherContext.Provider value={{ currentWeather, futureWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { WeatherContext, WeatherProvider, useWeather };
