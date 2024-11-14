import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";

export default function MyTabBar({ state, descriptors, navigation }) {
  const { theme, themeColors } = useTheme();
  const containerBg = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor: withTiming(containerBg.value, { duration: 90 }),
    };
  });

  useFocusEffect(() => {
    containerBg.value = themeColors?.bg;
  });

  return (
    <Animated.View
      key={theme}
      entering={FadeIn.duration(200)}
      style={[styles.container, animatedStyle]}
    >
      <BlurView
        intensity={60}
        tint={
          theme === "dark"
            ? "systemThickMaterialDark"
            : "systemThickMaterialLight"
        }
        experimentalBlurMethod="dimezisBlurView"
        blurReductionFactor={0}
        style={[
          styles.tabBlur,
          {
            backgroundColor: themeColors?.fg + "ab",
            shadowColor: themeColors?.text + "90",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 1,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  // type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={[
                {
                  flex: 1,
                  padding: 10,
                  alignItems: "center",
                },
                styles.tabBarStyle,
              ]}
            >
              {options.tabBarIcon ? (
                options.tabBarIcon({
                  color: isFocused
                    ? themeColors?.primary
                    : themeColors?.textFade,
                  fill: isFocused ? themeColors?.primary : "transparent",
                  focused: isFocused,
                })
              ) : (
                <Text style={{ color: isFocused ? "blue" : "gray" }}>
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
  tabBlur: {
    alignSelf: "center",
    maxWidth: 300,
    width: "85%",
    flexDirection: "row",
    borderRadius: 50,
    overflow: "hidden",
    padding: "3%",
  },
  tabBarStyle: {
    borderRadius: 50,
    overflow: "hidden",
  },
});
