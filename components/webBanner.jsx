import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { DynamicView } from "./Dynamics";
import useClamp, { calculateClamp } from "../hooks/useClamp";
import CloudBg from "./CloudBg";
import { useTheme } from "../context/ThemeContext";

const WebBanner = () => {
  const { width, height } = useWindowDimensions();
  const { themeColors } = useTheme();

  return (
    <DynamicView
      style={[
        styles.banner,
        {
          paddingTop: 60 + calculateClamp(width, 10, "3%", 60) + 5,
          // position: "absolute",
          width: width - calculateClamp(width, 340, "42%", 620),
          // backgroundColor: themeColors?.bg,
        },
      ]}
    >
      {/* <CloudBg /> */}
      <Text style={styles.text}>Welcome to the Weather App</Text>
    </DynamicView>
  );
};

const styles = StyleSheet.create({
  banner: {
    // flex: 1,
    // width: "100%",
    height: "100%",
    zIndex: 0,
    left: 0,
    top: 0,
    // backgroundColor: "#4A90E2",
    padding: 20,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WebBanner;
