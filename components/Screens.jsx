import React, { useCallback, useState, memo } from "react";
import {
  View,
  useWindowDimensions,
  Platform,
  RefreshControl,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { calculateClamp } from "../hooks/useClamp";
import { useTheme } from "../context/ThemeContext";
import { ThemeScreen, ThemeText } from "./ThemeComponents";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeather } from "../context/WeatherContext";
import { StyleSheet } from "react-native";

const SPRING_CONFIG = {
  overshootClamping: true,
};

const Header = memo(
  ({ title, header, headerAnimatedStyle, headerTitleAnimatedStyle }) => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const { wide } = useTheme();

    return (
      <Animated.View
        style={[
          styles.header(wide, width, height, title, insets),
          headerAnimatedStyle,
        ]}
      >
        <Animated.View style={[{}, title && headerTitleAnimatedStyle]}>
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
              <ThemeText styles={styles.themeText(wide)}>{title}</ThemeText>
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    );
  }
);
const TitleView = memo(({ title, animatedStyle }) => {
  const { width, height } = useWindowDimensions();
  const { wide } = useTheme();

  return (
    <View style={styles.titleView(title, wide, width, height)}>
      <Animated.View style={animatedStyle}>
        <ThemeText styles={styles.animatedTitleText(wide)}>{title}</ThemeText>
      </Animated.View>
    </View>
  );
});

export const Screen = memo(
  ({
    children,
    header,
    title,
    fixed,
    style,
    alwaysShowHeader,
    transitHeader,
    transitHeaderTreshhold = 35,
    reRender = true,
    refresh = true,
    refreshAction,
    refreshProps,
    ...props
  }) => {
    const { themeColors, wide } = useTheme();
    const { fetchWeather } = useWeather();
    const { width, height } = useWindowDimensions();
    const [key, setKey] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const scrollY = useSharedValue(0);

    const scrollViewRef = useAnimatedRef(null);

    const shouldRender = reRender ? key : true;

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    });

    useFocusEffect(
      useCallback(() => {
        setKey(true);
        scrollY.value = 0;

        return () => {
          setKey(false);
        };
      }, [scrollY])
    );

    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollY.value,
        [0, transitHeaderTreshhold - 5],
        [1, 0],
        Extrapolation.CLAMP
      );

      return {
        opacity: withSpring(opacity, SPRING_CONFIG),
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

    const onRefresh = useCallback(async () => {
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
        {shouldRender && (
          <View style={styles.container(wide, height)}>
            <View style={styles.scrollViewContainer}>
              {(!wide || alwaysShowHeader) && (
                <Header
                  title={title}
                  header={header}
                  headerTitleAnimatedStyle={headerTitleAnimatedStyle}
                />
              )}
              <Animated.ScrollView
                keyboardShouldPersistTaps="handled"
                overScrollMode="always"
                bounces={true}
                showsVerticalScrollIndicator={false}
                style={{ height }}
                contentContainerStyle={[
                  style,
                  {
                    minHeight: alwaysShowHeader && height - 4,
                  },
                ]}
                onScroll={title && scrollHandler}
                decelerationRate="fast"
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
                  <TitleView title={title} animatedStyle={animatedStyle} />
                )}
                {wide && !title && <View style={styles.spacer(wide, width)} />}
                <View
                  style={styles.contentContainer(
                    wide,
                    alwaysShowHeader,
                    width,
                    height,
                    transitHeaderTreshhold
                  )}
                >
                  {React.Children.map(children, (child) =>
                    React.cloneElement(child, { screenScrollY: scrollY })
                  )}
                </View>
                <View style={styles.footer(wide)} />
              </Animated.ScrollView>
            </View>
          </View>
        )}
      </ThemeScreen>
    );
  }
);

const styles = StyleSheet.create({
  container: (wide, height) => ({
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    // maxHeight: height,
    maxWidth: wide && 500,
    alignSelf: "center",
  }),
  scrollViewContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: (wide, width, height, title, insets) => ({
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
    // position: title ? "absolute" : "relative",
    paddingTop: insets.top,
    width: "100%",
    zIndex: 100,
  }),
  titleView: (title, wide, width, alwaysShowHeader) => ({
    // height: title ? 165 : height > 1024 ? height / 20 : 0,
    justifyContent: "flex-end",
    paddingBottom: title && 35,
    paddingHorizontal: wide ? calculateClamp(width, 16, "2%", 54) : 16,
  }),
  themeText: (wide) => ({
    fontSize: wide ? 23 : 18,
    opacity: 0.9,
    textAlign: wide ? "start" : "center",
    paddingLeft: wide ? 8 : 0,
  }),
  animatedTitleText: (wide) => ({
    fontSize: 29.5,
    opacity: 0.9,
    paddingLeft: wide ? 8 : 0,
    textAlign: !wide && Platform.OS === "web" ? "center" : "start",
  }),
  contentContainer: (
    wide,
    alwaysShowHeader,
    width,
    height,
    transitHeaderTreshhold
  ) => ({
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: wide ? calculateClamp(width, 16, "2%", 54) : 16,
    minHeight: alwaysShowHeader && height - (transitHeaderTreshhold + 190),
  }),
  spacer: (wide, width) => ({
    height:
      wide && Platform.OS === "web"
        ? 60 + calculateClamp(width, 10, "2%", 40) + 5
        : 20,
  }),
  footer: (wide) => ({
    height: Platform.OS === "web" ? 180 : wide ? 180 : 150,
  }),
});
