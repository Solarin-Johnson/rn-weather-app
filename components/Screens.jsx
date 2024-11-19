import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import Animated, {
  Easing,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { useFocusEffect, usePathname } from "expo-router";
import { getPlatform } from "../functions";
// import HomeHeader from "./HomeHeader";
import WebBanner from "./webBanner";
import { calculateClamp } from "../hooks/useClamp";
import { useTheme } from "../context/ThemeContext";
import { ThemeScreen } from "./ThemeComponents";
import HomeHeader from "./HomeHeader";
import CloudBg from "./CloudBg";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children, header, styles }) {
  const { themeColors } = useTheme();
  const platform = getPlatform();
  const { width } = useWindowDimensions();
  const wide = width > 720;
  const [key, setKey] = useState(false);
  const [screenLayout, setScreenLayout] = useState({
    width: 0,
    height: 0,
  });

  const Wrapper = platform === "web" || wide ? View : Animated.View;

  const animatedProps =
    platform === "web"
      ? {}
      : {
          entering: SlideInRight.duration(400)
            .easing(Easing.bezier(0.01, 1, 0.01, 1))
            .withInitialValues({
              transform: [{ translateX: 10 ** 53 }],
              opacity: 0,
            }),
        };

  useFocusEffect(
    useCallback(() => {
      setKey(true);

      return () => {
        setKey(false);
      };
    }, [])
  );

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setScreenLayout({ width, height });
  };

  return (
    <ThemeScreen>
      <View key={key} onLayout={onLayout} style={{ flex: 1 }}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          {platform === "web" || key ? (
            <Wrapper
              {...animatedProps}
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              {!wide && (
                <>
                  <View>{header}</View>
                </>
              )}
              <ScrollView
                style={[
                  {
                    flex: 1,
                    maxHeight: "100%",
                  },
                  styles,
                ]}
              >
                <View
                  style={{
                    height: wide
                      ? 60 + calculateClamp(width, 10, "3%", 50) + 5
                      : 0,
                  }}
                />
                {children}
                <View
                  style={{
                    height: 80,
                  }}
                ></View>
              </ScrollView>
            </Wrapper>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ThemeScreen>
  );
}
