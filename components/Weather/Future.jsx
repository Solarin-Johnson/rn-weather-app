import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getNextHoursWeather } from "../../api";
import WeatherMini from "./Mini";

const WeatherFuture = ({
  futureWeather,
  currentWeather,
  currentWeatherLoc,
}) => {
  const [next3HoursWeather, setNext3HoursWeather] = useState(null);

  useEffect(() => {
    if (futureWeather) {
      setNext3HoursWeather(
        getNextHoursWeather(futureWeather, currentWeatherLoc.localtime)
      );
    }
  }, [futureWeather]);

  return (
    <View style={styles.container}>
      <WeatherMini currentWeather={currentWeather} now />
      {next3HoursWeather &&
        next3HoursWeather.map((weather, index) => {
          return <WeatherMini key={index} currentWeather={weather} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default WeatherFuture;
