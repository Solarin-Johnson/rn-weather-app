import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import generalStyles from "../../styles/styles";
import { ThemeText } from "../ThemeComponents";
import WeatherMini from "./Mini";
import { getDayFromEpoch } from "../../functions";
import { useUser } from "../../context/UserContext";
import { getNextHoursWeather } from "../../api";

const DailyForecast = ({ dailyData }) => {
  const { preferences } = useUser();
  //   const { avgtemp_c, avgtemp_f, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, conf } =
  return (
    <View style={styles.container}>
      <ThemeText styles={styles.title}>Daily Forecast</ThemeText>
      <View style={styles.body}>
        {Array.isArray(dailyData) &&
          dailyData.map((item, index) => {
            const {
              avgtemp_c,
              avgtemp_f,
              maxtemp_c,
              maxtemp_f,
              mintemp_c,
              mintemp_f,
              condition,
              is_day,
            } = item.day;

            const maxtemp = parseInt(
              preferences?.metric ? maxtemp_c : maxtemp_f
            );
            const mintemp = parseInt(
              preferences?.metric ? mintemp_c : mintemp_f
            );

            return (
              <WeatherMini
                key={index}
                currentWeather={item}
                realProps={{
                  title: getDayFromEpoch(item.date_epoch),
                  temp: `${mintemp}°/ ${maxtemp}°`,
                  condition,
                  is_day,
                }}
                stylesProp={{
                  body: {
                    gap: 1,
                  },
                  icon: 45,
                  temp: {
                    fontSize: 16,
                    lineHeight: 24,
                  },
                }}
              />
            );
          })}
      </View>
    </View>
  );
};

const DailyForecastCard = (props) => {
  const { day, date } = props;
  const {
    avgtemp_c,
    avgtemp_f,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    condition,
  } = day;

  return (
    <View style={styles.item}>
      {/* <Text>{title}</Text> */}
      <Text>{condition}</Text>
      {/* <Text>{temp_c}°C</Text> */}
    </View>
  );
};

const HourlyForecast = ({ weather, forcast, currentWeatherLoc }) => {
  const [next3HoursWeather, setNext3HoursWeather] = useState(null);

  useEffect(() => {
    if (forcast) {
      setNext3HoursWeather(
        getNextHoursWeather(forcast, currentWeatherLoc.localtime, 18)
      );
    }
  }, [forcast]);

  return (
    <View style={styles.container}>
      <ThemeText styles={styles.title}>Hourly Forecast</ThemeText>
      <View>
        <View style={[styles.body]}>
          <WeatherMini currentWeather={weather} now />
          {next3HoursWeather &&
            next3HoursWeather.map(
              (weather, index) =>
                index !== 0 &&
                index % 6 === 0 && (
                  <WeatherMini
                    key={index}
                    currentWeather={weather}
                    stylesProp={{
                      body: {
                        gap: 1,
                      },
                      icon: 45,
                      temp: {
                        fontSize: 16,
                        lineHeight: 24,
                      },
                    }}
                  />
                )
            )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  title: {
    // fontSize: 18,
    textAlign: "center",
    paddingTop: 15,
  },
  body: {
    // backgroundColor: "#fff",
    width: "100%",
    maxWidth: 500,
    // alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export { DailyForecast, HourlyForecast };
