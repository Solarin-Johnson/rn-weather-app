import { ImageBackground } from "expo-image";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import { getBrightness, getHours } from "../functions";
import { useTheme } from "../context/ThemeContext";
import { useWeather } from "../context/WeatherContext";
import { memo } from "react";

const ImageBg = memo(({ children, style }) => {
  const { themeColors, wide } = useTheme();
  const { currentWeatherLoc } = useWeather();
  const { width, height } = useWindowDimensions();
  const hour = parseInt(getHours(currentWeatherLoc.localtime));

  const src = require("../assets/nature_day.webp");

  return (
    <ImageBackground
      source={wide ? src : ""}
      contentFit="fill"
      contentPosition="left top"
      // transition={Platform.OS === "web" && 180}
      style={[
        {
          flex: 1,
          overflow: "hidden",
          height: Platform.OS === "web" && height,
          backgroundColor: "#000000",
        },
        style,
      ]}
      imageStyle={{
        filter: `contrast(1.2) brightness(${getBrightness(hour)})`,
      }}
    >
      {children}
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ImageBg;
