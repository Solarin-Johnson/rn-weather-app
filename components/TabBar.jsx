import React, { forwardRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
  Dimensions,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { router, useFocusEffect, useSegments } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export const MyTabBar = forwardRef(({ children }, ref) => {
  const { theme, themeColors } = useTheme();
  const containerBg = useSharedValue(0);
  const { width } = useWindowDimensions();
  const wide = width > 760;
  const maskColor = wide ? themeColors?.bgFade : themeColors?.bg;
  const colorStops = wide
    ? ["transparent", maskColor + "70", maskColor]
    : ["transparent", maskColor, maskColor];

  const animatedStyle = useAnimatedStyle(() => {
    return {};
  });

  useFocusEffect(() => {
    containerBg.value = themeColors?.bg;
  });

  const TabBottomGradient = Platform.OS !== "ios" ? LinearGradient : View;

  return (
    <TabBottomGradient ref={ref} colors={colorStops} style={styles.container}>
      <Animated.View
        key={theme}
        entering={FadeIn.duration(500)}
        style={[animatedStyle]}
      >
        <BlurView
          intensity={60}
          tint={
            theme === "dark"
              ? "systemThickMaterialDark"
              : "systemThickMaterialLight"
          }
          blurReductionFactor={0}
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
    const { theme, themeColors } = useTheme();
    const segments = useSegments();
    const isFocused =
      props.href === "/" + segments[segments.length - 1] ||
      segments.length - 1 + index === 0;

    return (
      <Pressable
        style={[styles.tabBarStyle]}
        android_ripple={{
          color: themeColors?.textFade + "40",
          borderless: true,
        }}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
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
    flex: 1,
    minWidth: Math.min(Dimensions.get("window").width, 400),
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
    paddingHorizontal: 11,
    borderRadius: 50,
    overflow: "hidden",
  },
});

export default MyTabBar;
