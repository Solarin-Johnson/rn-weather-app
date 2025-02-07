import React, { memo, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { getWeatherGroup } from "../functions";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useTheme } from "../context/ThemeContext";

const WeatherIcon = memo(({ code, absolute, isDay, size, style }) => {
  // Memoizing the weather group and the image source based on the 'code' prop
  const weatherGroup = useMemo(() => getWeatherGroup(code), [code]);
  const [key, setKey] = useState(false);
  const { themeColors } = useTheme();

  // Weather icon mapping
  const weatherIcons = useMemo(
    () => ({
      clear: require("../assets/iconPacks/clear.png"),
      cloudy: require("../assets/iconPacks/cloudy.png"),
      foggy: require("../assets/iconPacks/foggy.png"),
      lightPrecipitation: require("../assets/iconPacks/lightPrecipitation.png"),
      moderateHeavyPrecipitation: require("../assets/iconPacks/heavyPrecipitation.png"),
      freezingConditions: require("../assets/iconPacks/freezing.png"),
      thunderstorms: require("../assets/iconPacks/thunderstorms.png"),
      icePellets: require("../assets/iconPacks/icePellets.png"),
    }),
    []
  );

  // Determine source based on weather group
  const src =
    weatherIcons[weatherGroup] ||
    require("../assets/iconPacks/moon-and-cloud.png");

  useFocusEffect(() => {
    setKey(1);
    return () => {
      // setKey(0);
    };
  });

  const imgConfig = useMemo(
    () => ({
      style: [styles.image, style, { width: size || "60%" }],
      contentFit: "contain",
      cachePolicy: "disk",
    }),
    [style, size]
  );

  return (
    <View style={styles.container}>
      {key ? (
        isDay || absolute ? (
          <CachedImage {...imgConfig} source={src} />
        ) : (
          <CachedImage
            {...imgConfig}
            source={require("../assets/iconPacks/night.png")}
          />
        )
      ) : (
        <View style={{ width: size ? size : "60%", aspectRatio: 1 }}>
          {/* <ActivityIndicator color={themeColors?.primary} /> */}
        </View>
      )}
    </View>
  );
});

const CachedImage = memo((props) => (
  <Image {...props} cachePolicy="disk" transition={500} />
));

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    // filter: Platform.OS !== "ios" ? "blur(0.51px)" : "",
    aspectRatio: 1,
  },
});

export default WeatherIcon;
