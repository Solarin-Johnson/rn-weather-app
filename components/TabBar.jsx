import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function MyTabBar({ state, descriptors, navigation }) {
  const { themeColors } = useTheme();
  const { primary } = themeColors || {};

  return (
    <View style={styles.container}>
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
                type: "tabPress",
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
                color: isFocused ? "red" : "gray",
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "85%",
    maxWidth: 300,
    alignSelf: "center",
    bottom: "9%",
    borderRadius: 50,
    overflow: "hidden",
    padding: "3%",
    backgroundColor: "white",
  },

  tabBarStyle: {
    borderRadius: 50,
    overflow: "hidden",
  },
});
