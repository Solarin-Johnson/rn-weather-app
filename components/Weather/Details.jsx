import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  PixelRatio,
  Platform,
} from "react-native";
import { AdaptiveElement, ThemeText } from "../ThemeComponents";
import { useUser } from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { ChevronsDown } from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useBottomSheet } from "../../context/BottomSheetContext";
import generalStyles from "../../styles/styles";
import { DailyForecast, HourlyForecast } from "./Forcast";
import {
  calculateUnits,
  classifyUV,
  defaultAnimation,
  displayUV,
} from "../../functions";
import { useFocusEffect } from "expo-router";

const WeatherDetails = ({
  weather,
  forcast,
  currentLoc,
  isBottomSheet,
  style,
}) => {
  const cards = [
    { content: <CommonDetails weather={weather} /> },
    forcast && { content: <DailyForecast dailyData={forcast.forecastday} /> },
    forcast &&
      currentLoc && {
        content: (
          <HourlyForecast
            weather={weather}
            forcast={forcast}
            full={!isBottomSheet}
            currentWeatherLoc={currentLoc}
          />
        ),
      },
  ].filter(Boolean);

  return (
    <View
      style={[
        styles.wrapper,
        { marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(4) },
      ]}
    >
      {cards.map((card, index) => (
        <WeatherDetailsCard hasBg={isBottomSheet} index={index} key={index}>
          {card.content}
        </WeatherDetailsCard>
      ))}
    </View>
  );
};

const WeatherDetailsCard = ({ style, children, index }) => {
  const { themeColors, theme, wide } = useTheme();

  return (
    <Animated.View
      entering={defaultAnimation(index, FadeIn, FadeInDown)}
      style={[
        styles.container,
        generalStyles.bottomCard,
        {
          backgroundColor: wide
            ? themeColors?.bg + (theme === "light" ? "60" : "90")
            : themeColors?.fg + (theme === "light" ? "" : "90"),
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const CommonDetails = ({ weather }) => {
  const { themeColors } = useTheme();
  const { measurement, display } = useUser();
  const { humidity, wind_kph, pressure_mb, precip_mm, uv } = weather;
  const wind = calculateUnits(wind_kph, measurement.windSpeedUnit, true);
  const precip = calculateUnits(
    precip_mm.toString(),
    measurement.precipitationUnit,
    true
  );

  console.log(measurement.precipitationUnit);

  return (
    <>
      <View style={styles.cluster}>
        <DetailsCard title="Humidity" value={`${humidity}%`} />
        <DetailsCard title="Pressure" value={precip} />
        {/* <DetailsCard title="Pressure" value={`${pressure_mb} hPa`} /> */}
      </View>
      <LinearGradient
        colors={["transparent", themeColors?.text + "55", "transparent"]}
        style={styles.split}
      />
      <View style={styles.cluster}>
        <DetailsCard
          title="UV Index"
          value={displayUV(uv, display.uvIndexDisplay)}
        />
        <DetailsCard title="Wind" value={wind} />
      </View>
    </>
  );
};

const DetailsCard = ({ title, value }) => {
  return (
    <View style={styles.detail}>
      <ThemeText styles={styles.title}>{title}</ThemeText>
      <ThemeText styles={styles.sub} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </ThemeText>
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
    gap: 24,
    overflow: "hidden",
  },
  container: {
    margin: 6,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // maxWidth: 400,
    alignSelf: "center",
  },
  cluster: {
    gap: 32,
    paddingVertical: 36,
    paddingHorizontal: 8,
    flex: 1,
  },
  split: {
    width: 1.5,
    height: Platform.OS === "web" ? 180 : "95%",
    maxHeight: 180,
  },
  detail: {
    alignItems: "center",
    overflow: "hidden",
    gap: 6,
    flex: 1,
  },
  title: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "500",
  },
  sub: {
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
  details: {
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
