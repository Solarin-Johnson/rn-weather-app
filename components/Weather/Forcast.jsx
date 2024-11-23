import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import generalStyles from "../../styles/styles";
import { ThemeText } from "../ThemeComponents";
import WeatherMini from "./Mini";
import { getDayFromEpoch } from "../../functions";
import { useUser } from "../../context/UserContext";

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

const HourlyForecast = ({ hourlyData }) => {
  return (
    <View style={styles.container}>
      <ThemeText styles={styles.title}>Hourly Forecast</ThemeText>
      <FlatList
        data={hourlyData}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.time}</Text>
            <Text>{item.temperature}°C</Text>
            <Text>{item.condition}</Text>
          </View>
        )}
        horizontal
      />
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
