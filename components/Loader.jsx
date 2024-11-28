import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Screen } from "./Screens";
import { useTheme } from "../context/ThemeContext";

const Loader = () => {
  const { themeColors } = useTheme();
  return (
    <Screen
      styles={{
        flex: 1,
        justifyContent: "center",
      }}
      fixed
    >
      <ActivityIndicator size={"large"} color={themeColors?.primary} />
    </Screen>
  );
};



export default Loader;
