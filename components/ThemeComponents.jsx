import { View, Text, useWindowDimensions } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import generalStyles from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { useFocusEffect, usePathname } from "expo-router";
import { getPlatform } from "../functions";
import HomeHeader from "./HomeHeader";
import WebBanner from "./webBanner";
import { calculateClamp } from "../hooks/useClamp";

export function ThemeView({ children, styles }) {
  const { themeColors } = useTheme();
  return (
    <View
      style={[
        generalStyles.screen,
        styles,
        { backgroundColor: themeColors?.bg },
      ]}
    >
      {children}
    </View>
  );
}

export function ThemeScreen({ children, header, styles }) {
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
          entering: SlideInRight.duration(200)
            .easing(Easing.bezier(0, 1, 0, 1))
            .withInitialValues({
              transform: [{ translateX: 10 ** 53 }],
              opacity: 0,
            }),
          exiting: SlideOutLeft,
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
    <View
      style={[
        generalStyles.stack,
        {
          backgroundColor: themeColors?.bg,
        },
      ]}
      key={key}
      onLayout={onLayout}
    >
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
              flex: 1,
              maxWidth: 720,
              flexDirection: "column",
              backgroundColor: wide ? themeColors?.text + "20" : "",
            }}
          >
            {width < 720 && <View>{header}</View>}
            <View
              style={[
                {
                  flex: 1,
                  paddingTop: wide
                    ? 60 + calculateClamp(width, 10, "5%", 50) * 2
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
  );
}

export function ThemeText({ children, styles }) {
  const { themeColors } = useTheme();
  return (
    <Text style={[generalStyles.text, styles, { color: themeColors?.text }]}>
      {children}
    </Text>
  );
}

export function AdaptiveElement({ children, styles }) {
  const { themeColors } = useTheme();

  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      style: [child.props?.style, { color: themeColors?.text }],
    })
  );
  return <>{clonedChildren}</>;
}
