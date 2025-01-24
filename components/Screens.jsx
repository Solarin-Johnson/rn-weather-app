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
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
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
  transitHeaderTreshhold = 35,
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

  const springConfig = {
    overshootClamping: true,
  };

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
      [0, transitHeaderTreshhold - 5], // The range of scrollY (0 to 100)
      [1, 0], // The range of opacity (1 to 0)
      Extrapolation.CLAMP // Prevent values from going out of range
    );

    return {
      opacity: withSpring(opacity, springConfig), // Apply the calculated opacity
    };
  });

  const headerTitleAnimatedStyle = useAnimatedStyle(() => {
    const isAboveThreshold = scrollY.value > transitHeaderTreshhold + 4;

    return {
      opacity: withTiming(isAboveThreshold ? 1 : 0, {
        duration: isAboveThreshold && 200,
        easing: Easing.ease,
      }),
      transform: [
        {
          translateY: withTiming(isAboveThreshold ? 0 : 6, {
            duration: 200,
            easing: Easing.ease,
          }),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        scrollY.value > 0
          ? wide
            ? themeColors.bgFade
            : themeColors.bg
          : "transparent",
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
                      paddingTop: insets.top,
                      width: "100%",
                      zIndex: 100,
                    },
                    headerAnimatedStyle,
                  ]}
                >
                  <Animated.View
                    style={[{}, title && headerTitleAnimatedStyle]}
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
                      height: 165,
                      justifyContent: "flex-end",
                      paddingBottom: 35,
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
