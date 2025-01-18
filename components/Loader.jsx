import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Screen } from "./Screens";
import { useTheme } from "../context/ThemeContext";

const Loader = ({ full = true }) => {
  const { themeColors } = useTheme();
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        ...(full && { height: height }),
        backgroundColor: themeColors?.bg,
      }}
    >
      <ActivityIndicator size={"large"} color={themeColors?.primary} />
    </View>
  );
};

export default Loader;
