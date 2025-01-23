import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";
import {
  ChevronRight,
  Circle,
  CircleDot,
  RefreshCcw,
  Thermometer,
} from "lucide-react-native";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import generalStyles from "../styles/styles";

const Cluster = ({
  title,
  titleIcon: Icon,
  children,
  config = { transform: [{ translateY: 50 }] },
  backgroundColor,
}) => {
  const { theme, wide, themeColors } = useTheme();
  const initBg =
    wide && theme === "light"
      ? themeColors?.bg + "ef"
      : wide
        ? themeColors?.fg + "90"
        : themeColors?.fg + "90";
  return (
    <View
      style={{
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",
          gap: 6,
          opacity: 0.75,
        }}
      >
        {title && (
          <ThemeText
            styles={{
              fontSize: 15,
            }}
          >
            {title}
          </ThemeText>
        )}
        {/* {Icon && (
          <AdaptiveElement
            styles={{
              paddingHorizontal: 12,
            }}
          >
            <Icon size={19.5} strokeWidth={2} />
          </AdaptiveElement>
        )} */}
      </View>
      <Animated.View
        entering={
          Platform.OS !== "web"
            ? FadeInDown.duration(500).withInitialValues(config)
            : FadeIn.duration(200)
        }
        style={[
          styles.cluster,
          {
            backgroundColor: backgroundColor || initBg,
          },
        ]}
      >
        {React.Children.map(children, (child, index) => (
          <>
            {child}
            {index < React.Children.count(children) - 1 && (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: themeColors?.textFade + "25",
                  borderRadius: 1,
                }}
              />
            )}
          </>
        ))}
      </Animated.View>
    </View>
  );
};

export const ClusterChild = ({ children, onPress }) => {
  const { themeColors } = useTheme();
  return (
    <Pressable
      style={({ pressed, hovered }) => [
        {
          flex: 1,
          paddingHorizontal: 14,
          paddingVertical: 16,
          // borderRadius: "inherit",
          backgroundColor: hovered
            ? themeColors?.textFade + "07"
            : "transparent",
        },
        pressed && generalStyles.buttonPressed,
      ]}
      android_ripple={{
        color: themeColors?.textFade + "25",
      }}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export const ClusterItem = ({
  text,
  icon: Icon = Circle,
  iconRight,
  iconProps,
  onPress,
  loading,
  radio,
}) => {
  return (
    <ClusterChild onPress={onPress}>
      <View style={styles.item}>
        {Icon && (
          <View
            style={{
              width: 28,
            }}
          >
            <AdaptiveElement
              styles={{
                opacity: 0.9,
              }}
            >
              <Icon size={22} {...iconProps} />
            </AdaptiveElement>
          </View>
        )}
        <ThemeText
          styles={{
            flex: 1,
            fontSize: 16,
          }}
        >
          {text}
        </ThemeText>
        <IndicatorIcon {...{ icon: iconRight, loading, radio }} />
      </View>
    </ClusterChild>
  );
};

const IndicatorIcon = ({ icon, loading, radio }) => {
  const Icon =
    icon ||
    (radio
      ? (radio === "true" && CircleDot) || Circle
      : loading
        ? RefreshCcw
        : ChevronRight);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1200, easing: Easing.linear }),
        -1, // Infinite loop
        false // No reverse
      );
    } else {
      const duration = ((360 - (rotation.value % 360)) * 1200) / 360;
      if (rotation.value > 0) {
        rotation.value = withTiming(360, {
          duration: duration,
          easing: Easing.linear,
        });

        return () => {
          rotation.value = 0;
        };
      }
    }
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <AdaptiveElement styles={{ opacity: radio ? 0.9 : 0.7 }}>
        <Icon size={20} strokeWidth={radio ? 2.5 : 2} />
      </AdaptiveElement>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cluster: {
    flexDirection: "column",
    borderRadius: 14,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
});

export default Cluster;
