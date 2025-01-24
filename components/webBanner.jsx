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
          alignItems: "center",
          justifyContent: "center",
          width: width - calculateClamp(width, 340, "42%", 620),
        },
      ]}
    >
      {/* <CloudBg /> */}
      <Text style={styles.text}>Somethin comin</Text>
    </DynamicView>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: "100%",
    zIndex: 0,
    left: 0,
    top: 0,
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
