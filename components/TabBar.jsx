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

export default function MyTabBar({ state, descriptors, navigation }) {
  const { theme, themeColors } = useTheme();

  return (
    <BlurView
      intensity={60}
      tint={
        theme === "dark"
          ? "systemThickMaterialDark"
          : "systemThickMaterialLight"
      }
      experimentalBlurMethod="dimezisBlurView"
      style={[
        styles.container,
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
                color: isFocused ? themeColors?.primary : themeColors?.textFade,
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
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    width: "85%",
    maxWidth: 300,
    alignSelf: "center",
    bottom: "5%",
    borderRadius: 50,
    overflow: "hidden",
    padding: "3%",
    overflow: "hidden",
    // backgroundColor: "white",
  },

  tabBarStyle: {
    borderRadius: 50,
    overflow: "hidden",
  },
});
