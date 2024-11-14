import { View, Text } from "react-native";
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

export function ThemeScreen({ children, styles }) {
  const { themeColors } = useTheme();
  const [key, setKey] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setKey(true);

      return () => {
        setKey(false);
      };
    }, [])
  );

  return (
    <View
      style={[generalStyles.stack, { backgroundColor: themeColors?.bg }]}
      key={key}
    >
      {key ? (
        <Animated.View
          entering={SlideInRight.duration(200)
            .easing(Easing.bezier(0, 1, 0, 1))
            .withInitialValues({
              transform: [{ translateX: 10 ** 53 }],
              opacity: 0,
            })}
          exiting={SlideOutLeft}
          style={{ flex: 1 }}
        >
          <View style={[{ flex: 1 }, styles]}>{children}</View>
        </Animated.View>
      ) : (
        <></>
      )}
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
