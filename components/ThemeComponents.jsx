import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import generalStyles from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

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

export function ThemeScreen({ children }) {
  const { themeColors } = useTheme();
  const { width } = useWindowDimensions();
  const wide = width > 720;

  return (
    <View
      style={[
        generalStyles.stack,
        {
          backgroundColor: wide ? themeColors?.bgFade : themeColors?.bg,
        },
      ]}
    >
      {children}
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
