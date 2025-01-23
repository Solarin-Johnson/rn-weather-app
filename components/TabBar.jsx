import React, { forwardRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Keyboard,
  Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect, useSegments } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export const MyTabBar = forwardRef(({ children }, ref) => {
  const { theme, themeColors } = useTheme();
  const { width } = useWindowDimensions();
  const wide = width > 720;
  const maskColor = wide ? themeColors?.bgFade : themeColors?.bg;

  const TabBottomGradient = Platform.OS !== "ios" ? LinearGradient : View;

  return (
    <TabBottomGradient
      ref={ref}
      colors={["transparent", maskColor + "bc", maskColor, maskColor]}
      style={styles.container}
    >
      <Animated.View key={theme} entering={FadeIn}>
        <BlurView
          intensity={10}
          tint={
            theme === "dark"
              ? "systemThickMaterialDark"
              : "systemThickMaterialLight"
          }
          blurReductionFactor={0}
          experimentalBlurMethod="dimezisBlurView"
          style={[
            styles.tabBlur,
            {
              backgroundColor: themeColors?.fg + "ab",
              shadowColor: "#000000df",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          {children}
        </BlurView>
      </Animated.View>
    </TabBottomGradient>
  );
});

export const TabButton = forwardRef(
  ({ options, icon, index, children, style, ...props }, ref) => {
    const { themeColors } = useTheme();
    const segments = useSegments();
    const isFocused =
      props.href === "/" + segments[segments.length - 1] ||
      segments.length - 1 + index === 0;

    return (
      <Pressable
        style={[styles.tabBarStyle]}
        android_ripple={{
          color: themeColors?.textFade + "25",
          borderless: true,
        }}
        {...props}
      >
        {options.tabBarIcon &&
          options.tabBarIcon({
            fill: isFocused ? themeColors?.primary : "transparent",
            color: isFocused ? themeColors?.primary : themeColors?.textFade,
            focused: isFocused,
            size: Platform.OS === "web" ? 24 : Platform.OS === "ios" ? 30 : 28,
          })}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingBottom: Platform.OS === "ios" ? "11%" : "8%",
    bottom: "0",
    paddingTop: 50,
    width: "100%",
  },
  tabBlur: {
    alignSelf: "center",
    maxWidth: 300,
    width: "85%",
    flexDirection: "row",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "space-evenly",
  },
  tabBarStyle: {
    paddingVertical: 24,
    paddingHorizontal: 10,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyTabBar;
