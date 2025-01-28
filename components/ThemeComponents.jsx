import { View, Text, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const { themeColors, fullscreen } = useTheme();
  const { width } = useWindowDimensions();
  const wide = width > 760;
  const screenRef = useRef(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (screenRef.current) {
      screenRef.current.measure((x, y, width) => {
        if (mounted) {
          setLayoutWidth(width);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [fullscreen]);

  return (
    <View
      ref={screenRef}
      style={[
        generalStyles.stack,
        {
          backgroundColor: wide ? themeColors?.bgFade + "90" : themeColors?.bg,
          backdropFilter: wide ? "blur(20px)" : "none",
          minWidth: Math.min(550, layoutWidth),
        },
      ]}
    >
      {children}
    </View>
  );
}

export function ThemeText({ inv, children, shadow, styles, style, ...props }) {
  const { themeColors } = useTheme();
  return (
    <Text
      style={[
        generalStyles.text,
        styles,
        {
          color: inv ? themeColors?.bg : themeColors?.text,
          // textShadowColor: shadow ? "#00000099" : "transparent",
          // textShadowOffset: shadow
          //   ? { width: 0, height: 0 }
          //   : { width: 0, height: 0 },
          // textShadowRadius: shadow ? 50 : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function AdaptiveElement({ children, inv, styles, style }) {
  const { themeColors } = useTheme();

  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      style: [
        child.props?.style,
        styles,
        { color: inv ? themeColors?.bg : themeColors?.text },
        style,
      ],
    })
  );
  return <>{clonedChildren}</>;
}
