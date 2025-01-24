import {
  View,
  useWindowDimensions,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { calculateClamp } from "../hooks/useClamp";
import { useTheme } from "../context/ThemeContext";
import { ThemeScreen, ThemeText } from "./ThemeComponents";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardGestureArea } from "react-native-keyboard-controller";
import { useWeather } from "../context/WeatherContext";

export function Screen({
  children,
  header,
  title,
  fixed,
  styles,
  alwaysShowHeader,
  transitHeader,
  transitHeaderTreshhold = 40,
  reRender = true,
  refresh = true,
  refreshAction,
  refreshProps,
  ...props
}) {
  const { themeColors, isLandscape } = useTheme();
  const { width, height } = useWindowDimensions();
  const wide = width > 720;
  const [key, setKey] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [screenLayout, setScreenLayout] = useState({
    width: 0,
    height: 0,
  });
  const { fetchWeather } = useWeather();
  const scrollY = useSharedValue(0); // Use useSharedValue

  const scrollViewRef = useAnimatedRef(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y; // Update the shared value
    },
  });

  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setKey(true);
      scrollY.value = 0;

      return () => {
        setKey(false);
      };
    }, [])
  );

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setScreenLayout({ width, height });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value, // The value to interpolate
      [0, transitHeaderTreshhold + 28], // The range of scrollY (0 to 100)
      [1, 0], // The range of opacity (1 to 0)
      Extrapolation.CLAMP // Prevent values from going out of range
    );

    return {
      opacity, // Apply the calculated opacity
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, transitHeaderTreshhold + 28, transitHeaderTreshhold + 40],
      [0, 0, 1],
      Extrapolation.CLAMP,
      Easing.bezier(0.33, 1, 0.68, 1) // Add easeOutCubic easing
    );

    const translateY = interpolate(
      scrollY.value,
      [0, transitHeaderTreshhold + 28, transitHeaderTreshhold + 40],
      [28, 5, 0],
      Extrapolation.CLAMP,
      Easing.bezier(0.33, 1, 0.68, 1) // Add same easing for consistency
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (refreshAction) {
        await refreshAction();
      } else {
        await fetchWeather();
      }
    } catch (error) {
      console.warn("Refresh failed:", error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 2500);
    }
  }, [refreshAction, fetchWeather]);

  return (
    <ThemeScreen>
      {(reRender ? key : true) && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            maxHeight: height,
            width: "100%",
            maxWidth: wide ? 550 : "auto",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            {(!wide || alwaysShowHeader) && (
              <>
                <Animated.View
                  style={[
                    {
                      paddingTop: insets.top,
                      backgroundColor: wide
                        ? themeColors?.bgFade
                        : themeColors?.bg,
                      width: "100%",
                      ...(wide
                        ? {
                            height: 60 + calculateClamp(width, 10, "2%", 45),
                            paddingBottom: 10,
                            justifyContent: "flex-end",
                          }
                        : title && {
                            height: calculateClamp(height, 80, "10%", 120),
                            justifyContent: "center",
                          }),
                      position: title ? "absolute" : "relative",
                      zIndex: 100,
                    },
                    title && !wide && headerAnimatedStyle,
                  ]}
                >
                  {header}
                  {title && (
                    <Animated.View
                      style={[
                        headerAnimatedStyle,
                        {
                          paddingHorizontal: wide
                            ? calculateClamp(width, 16, "2%", 54)
                            : 16,
                        },
                      ]}
                    >
                      <ThemeText
                        styles={{
                          fontSize: wide ? 23 : 18,
                          opacity: 0.9,
                          textAlign: wide ? "start" : "center",
                          paddingLeft: wide ? 8 : 0,
                        }}
                      >
                        {title}
                      </ThemeText>
                    </Animated.View>
                  )}
                </Animated.View>
              </>
            )}
            <KeyboardGestureArea style={{ flex: 1 }}>
              <Animated.ScrollView
                keyboardShouldPersistTaps="handled"
                overScrollMode="always"
                bounces={true}
                showsVerticalScrollIndicator={false}
                style={[
                  {
                    height: height,
                  },
                ]}
                contentContainerStyle={[
                  styles,
                  {
                    minHeight: height - 4,
                  },
                ]}
                onScroll={title && scrollHandler} // Attach the animated scroll handler
                decelerationRate={"fast"}
                ref={scrollViewRef}
                refreshControl={
                  refresh && (
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      progressViewOffset={-20}
                      progressBackgroundColor={themeColors?.primary}
                      colors={[themeColors?.bg]}
                      tintColor={[themeColors?.bg]}
                      {...refreshProps}
                    />
                  )
                }
                {...props}
              >
                {title && (
                  <View
                    style={{
                      height: 180,
                      justifyContent: "flex-end",
                      paddingBottom: 40,
                      paddingHorizontal: wide
                        ? calculateClamp(width, 16, "2%", 54)
                        : 16,
                    }}
                  >
                    <Animated.View style={animatedStyle}>
                      <ThemeText
                        styles={{
                          fontSize: 29.5,
                          opacity: 0.9,
                          paddingLeft: wide ? 8 : 0,
                          textAlign:
                            !wide && Platform.OS === "web" ? "center" : "start",
                        }}
                      >
                        {title}
                      </ThemeText>
                    </Animated.View>
                  </View>
                )}
                {wide && !title && (
                  <View
                    style={{
                      height:
                        wide && Platform.OS === "web"
                          ? 60 + calculateClamp(width, 10, "3%", 50) + 5
                          : 20,
                    }}
                  />
                )}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    paddingHorizontal: wide
                      ? calculateClamp(width, 16, "2%", 54)
                      : 16,
                    minHeight:
                      alwaysShowHeader &&
                      height - (transitHeaderTreshhold + 190),
                  }}
                >
                  {React.Children.map(children, (child) =>
                    React.cloneElement(child, { screenScrollY: scrollY })
                  )}
                </View>

                <View
                  style={{
                    height: Platform.OS === "web" ? 180 : wide ? 180 : 150,
                  }}
                ></View>
              </Animated.ScrollView>
            </KeyboardGestureArea>
          </View>
        </View>
      )}
    </ThemeScreen>
  );
}
