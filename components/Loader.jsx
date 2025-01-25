import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const Loader = ({ full = true, noBg }) => {
  const { themeColors } = useTheme();
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        ...(full && { height: height }),
        ...(!noBg && { backgroundColor: themeColors?.bg }),
      }}
    >
      <ActivityIndicator size={"large"} color={themeColors?.primary} />
    </View>
  );
};

export default Loader;
