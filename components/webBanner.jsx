import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { DynamicView } from "./Dynamics";
import useClamp, { calculateClamp } from "../hooks/useClamp";

const WebBanner = () => {
  const { width, height } = useWindowDimensions();
  return (
    <DynamicView
      style={[
        styles.banner,
        { paddingTop: 60 + calculateClamp(width, 10, "5%", 50) * 2 },
      ]}
    >
      <Text style={styles.text}>Welcome to the Weather App</Text>
    </DynamicView>
  );
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
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