import { View, Text, useWindowDimensions } from "react-native";
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

  const Wrapper = platform === "web" ? View : Animated.View;

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
        <View style={{ flex: 1, flexDirection: "row" }}>
          {wide && (
            <>
              <HomeHeader
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                }}
              />
              <WebBanner />
            </>
          )}

          {platform === "web" || key ? (
            <Wrapper
              {...animatedProps}
              style={{
                // flex: 1,
                width: wide ? calculateClamp(width, 340, "42%", 620) : "100%",
                // maxWidth: 550,
                flexDirection: "column",
                backgroundColor: wide ? themeColors?.text + "15" : "",
              }}
            >
              {width < 720 && (
                <>
                  <View>{header}</View>
                  <CloudBg />
                </>
              )}
              <View
                style={[
                  {
                    flex: 1,
                    paddingTop: wide
                      ? 60 + calculateClamp(width, 10, "3%", 60) * 2
                      : 0,
                  },
                  styles,
                ]}
              >
                {children}
              </View>
            </Wrapper>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ThemeScreen>
  );
}
