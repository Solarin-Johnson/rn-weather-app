import React, { memo, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getWeatherGroup } from "../functions";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";

const WeatherIcon = memo(({ code, isDay, size, style }) => {
  // Memoizing the weather group and the image source based on the 'code' prop
  const weatherGroup = useMemo(() => getWeatherGroup(code), [code]);
  const [key, setKey] = useState(0);

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
      setKey(0);
    };
  });

  const imgConfig = {
    style: [styles.image, style, { width: size ? size : "60%" }],
    contentFit: "contain",
    cachePolicy: "disk",
  };

  return (
    <View style={styles.container}>
      {key ? (
        isDay ? (
          <Image {...imgConfig} source={src} />
        ) : (
          <Image
            {...imgConfig}
            source={require("../assets/iconPacks/night.png")}
          />
        )
      ) : (
        <></>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    // flex: 1,
    filter: "blur(0.51px)",
    aspectRatio: 1,
  },
});

export default WeatherIcon;
