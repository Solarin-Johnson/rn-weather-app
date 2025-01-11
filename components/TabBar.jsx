import React, { Children, forwardRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Keyboard,
  Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router, useFocusEffect, useSegments } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { House } from "lucide-react-native";

export const MyTabBar = forwardRef(
  ({ state, descriptors, navigation, children }, ref) => {
    const { theme, themeColors } = useTheme();
    const containerBg = useSharedValue(0);
    const { width } = useWindowDimensions();
    const wide = width > 720;
    const maskColor = wide ? themeColors?.bgFade2 : themeColors?.bg;
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => setKeyboardVisible(!true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => setKeyboardVisible(false)
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        // backgroundColor: withTiming(containerBg.value, { duration: 90 }),
      };
    });

    useFocusEffect(() => {
      containerBg.value = themeColors?.bg;
    });

    return (
      <LinearGradient
        ref={ref}
        colors={[
          "transparent",
          maskColor + "bc",
          maskColor,
          // themeColors?.bg,
          maskColor,
        ]}
        style={styles.container}
      >
        {!isKeyboardVisible && (
          <Animated.View
            // key={theme}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={[animatedStyle]}
          >
            <BlurView
              intensity={60}
              tint={
                theme === "dark"
                  ? "systemThickMaterialDark"
                  : "systemThickMaterialLight"
              }
              // experimentalBlurMethod="dimezisBlurView"
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
              {/* {state.routes.map((route, index) => {
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
          })} */}
              {children}
            </BlurView>
          </Animated.View>
        )}
      </LinearGradient>
    );
  }
);

export const TabButton = forwardRef(
  ({ options, icon, index, children, ...props }, ref) => {
    const { theme, themeColors } = useTheme();
    const segments = useSegments();
    const isFocused =
      props.href === "/" + segments[segments.length - 1] ||
      segments.length - 1 + index === 0;

    return (
      <Pressable
        style={[
          {
            flex: 1,
            padding: 10,
            alignItems: "center",
          },
          styles.tabBarStyle,
        ]}
        {...props}
      >
        {options.tabBarIcon ? (
          options.tabBarIcon({
            fill: isFocused ? themeColors?.primary : "transparent",
            color: isFocused ? themeColors?.primary : themeColors?.textFade,
            focused: isFocused,
            size: Platform.OS === "web" ? 24 : 28,
          })
        ) : (
          <Text style={{ color: isFocused ? "blue" : "gray" }}>{label}</Text>
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingBottom: "8%",
    bottom: "0",
    paddingTop: 50,
    width: "100%",
    // backgroundColor: "red",
  },
  tabBlur: {
    alignSelf: "center",
    maxWidth: 300,
    width: "85%",
    flexDirection: "row",
    borderRadius: 50,
    overflow: "hidden",
    padding: 12,
    justifyContent: "space-evenly",
  },
  tabBarStyle: {
    borderRadius: 50,
    overflow: "hidden",
  },
});

export default MyTabBar;
