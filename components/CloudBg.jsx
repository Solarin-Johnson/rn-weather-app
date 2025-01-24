import React from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { BgCloud } from "../styles/icons";
import { calculateClamp } from "../hooks/useClamp";
import { useTheme } from "../context/ThemeContext";

const CloudBg = () => {
  const { width, height } = useWindowDimensions();
  const { wide } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          top: -1 * (width > 500 ? calculateClamp(width, 20, "8%", 70) : 20),
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          width: "98%",
          maxWidth: 520,
        }}
      >
        <BgCloud />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    opacity: 0.8,
    left: 0,
    flex: 1,
    width: "100%",
    aspectRatio: 4 / 2.5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});

export default CloudBg;
