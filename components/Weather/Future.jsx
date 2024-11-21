import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWeather } from "../../context/WeatherContext";
import { getNextHoursWeather } from "../../api";
import WeatherMini from "./Mini";

const WeatherFuture = () => {
  const { futureWeather, currentWeather } = useWeather();
  const [next3HoursWeather, setNext3HoursWeather] = useState(null);

  useEffect(() => {
    if (futureWeather) {
      //   console.log("futureWeather", futureWeather);
      setNext3HoursWeather(getNextHoursWeather(futureWeather));
    }
  }, [futureWeather]);
  //   getNext3HoursWeather(futureWeather);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Future Weather Forecast</Text> */}
      <WeatherMini currentWeather={currentWeather} now />
      {next3HoursWeather &&
        next3HoursWeather.map((weather, index) => (
          <WeatherMini key={index} currentWeather={weather} />
        ))}
      {/* Add your future weather forecast components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    maxWidth: 500,
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
