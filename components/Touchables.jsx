import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function TouchableMadeEasier({
  children,
  onPress,
  round,
  width,
  style,
  styleParent,
  color,
  rippleColor,
}) {
  const { themeColors } = useTheme();
  return (
    <View
      style={[
        {
          borderRadius: round ? 1000 : 0,
          width: round && width ? width + round : "auto",
          height: round && width ? width + round : "auto",
        },
        styles.container,
        styleParent,
      ]}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        // background={TouchableNativeFeedback.Ripple(
        //   rippleColor ? rippleColor : themeColors?.primary + "00"
        //   //   false
        // )}
      >
        <View style={[styles.btn, style]}>
          <Text>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
