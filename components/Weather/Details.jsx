import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AdaptiveElement, ThemeText } from "../ThemeComponents";
import { useUser } from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { ChevronsDown } from "lucide-react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useBottomSheet } from "../../context/BottomSheetContext";
import generalStyles from "../../styles/styles";
import { DailyForecast, HourlyForecast } from "./Forcast";

const WeatherDetails = ({
  weather,
  forcast,
  currentLoc,
  hasMargin,
  isBottomSheet,
}) => {
  // const { setBottomSheet } = useBottomSheet();

  return (
    <View style={[styles.wrapper]}>
      <WeatherDetailsCard hasBg={isBottomSheet}>
        <CommonDetails {...{ weather }} />
      </WeatherDetailsCard>
      <WeatherDetailsCard hasBg>
        <DailyForecast dailyData={forcast.forecastday} />
      </WeatherDetailsCard>
      <WeatherDetailsCard hasBg>
        <HourlyForecast
          {...{ weather, forcast }}
          currentWeatherLoc={currentLoc}
        />
      </WeatherDetailsCard>
    </View>
  );
};

const WeatherDetailsCard = ({ hasBg, children }) => {
  const { themeColors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        generalStyles.bottomCard,
        {
          backgroundColor: hasBg ? themeColors?.fg : "",
          marginTop: hasBg ? 0 : 32,
        },
      ]}
    >
      {children}
    </View>
  );
};

const CommonDetails = ({ weather }) => {
  const { themeColors } = useTheme();
  const { preferences } = useUser();
  const { humidity, wind_kph, wind_mph, pressure_mb, uv } = weather;
  const wind = preferences?.metric
    ? parseInt(wind_kph) + " km/h"
    : parseInt(wind_mph) + " mph";

  return (
    <>
      <View style={styles.cluster}>
        <DetailsCard title="UV Index" value={uv} />
        <DetailsCard title="Pressure" value={`${pressure_mb} hPa`} />
      </View>
      <LinearGradient
        colors={["transparent", themeColors?.text + "55", "transparent"]}
        style={styles.split}
      />
      <View style={styles.cluster}>
        <DetailsCard title="Humidity" value={`${humidity}%`} />
        <DetailsCard title="Wind" value={wind} />
      </View>
    </>
  );
};

const DetailsCard = ({ title, value }) => {
  return (
    <View style={styles.detail}>
      <ThemeText styles={styles.title}>{title}</ThemeText>
      <ThemeText styles={styles.sub}>{value}</ThemeText>
    </View>
  );
};

const MoreDetails = ({ weather }) => {
  const { visibility_km, visibility_miles, dewpoint_c, dewpoint_f } = weather;
  const { preferences } = useUser();
  const visibility = preferences?.metric
    ? `${visibility_km} km`
    : `${visibility_miles} miles`;
  const dewpoint = preferences?.metric
    ? `${dewpoint_c} °C`
    : `${dewpoint_f} °F`;

  return (
    <View style={styles.moreDetails}>
      <DetailsCard title="Visibility" value={visibility} />
      <DetailsCard title="Dew Point" value={dewpoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
  },
  container: {
    margin: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  cluster: {
    gap: 32,
    padding: 18,
  },
  split: {
    width: 1.5,
    height: "100%",
  },
  detail: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "500",
  },
  sub: {
    fontSize: 19,
    fontWeight: "500",
  },
  details: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 18,
    borderRadius: 50,
    maxWidth: 300,
    width: "100%",
    alignSelf: "center",
    opacity: 0.9,
  },
});

export default WeatherDetails;
