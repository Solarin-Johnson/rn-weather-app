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
      <View>
        <ScrollView contentContainerStyle={[styles.body]}>
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
                  absolute
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
        </ScrollView>
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

const HourlyForecast = ({ weather, forcast, currentWeatherLoc, full }) => {
  const [next3HoursWeather, setNext3HoursWeather] = useState(null);

  useEffect(() => {
    if (forcast) {
      setNext3HoursWeather(
        getNextHoursWeather(
          forcast,
          currentWeatherLoc.localtime,
          full ? 24 : 18,
          true
        )
      );
    }
  }, [forcast]);

  return (
    <View style={styles.container}>
      <ThemeText styles={styles.title}>Hourly Forecast</ThemeText>
      <View>
        <ScrollView
          horizontal={full}
          contentContainerStyle={[!full && styles.body]}
          style={{
            paddingVertical: 28,
          }}
        >
          {/* <WeatherMini currentWeather={weather} now /> */}
          {next3HoursWeather &&
            next3HoursWeather.map(
              (weather, index) =>
                (!full ? index !== 0 && index % 6 === 0 : index % 2 === 0) && (
                  <WeatherMini
                    key={index}
                    currentWeather={weather}
                    stylesProp={{
                      body: {
                        gap: 0,
                        width: full && 100,
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
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 6,
  },
  title: {
    // fontSize: 18,
    textAlign: "center",
    paddingTop: 15,
  },
  body: {
    // flex: 1,
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    paddingVertical: 28,
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
