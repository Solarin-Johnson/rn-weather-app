import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronRight, RefreshCcw } from "lucide-react-native";
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

const Cluster = ({ children }) => {
  const { theme, wide, themeColors } = useTheme();
  return (
    <Animated.View
      entering={
        Platform.OS !== "web"
          ? FadeInDown.duration(500).withInitialValues({
              transform: [{ translateY: 50 }],
            })
          : FadeIn.duration(500)
      }
      style={[
        styles.cluster,
        {
          backgroundColor:
            wide && theme === "light"
              ? themeColors?.bg
              : wide
                ? themeColors?.fg
                : themeColors?.fg + "90",
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
  icon: Icon,
  iconRight = ChevronRight,
  iconProps,
  onPress,
  loading,
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
        <IndicatorIcon icon={iconRight} loading={loading} />
      </View>
    </ClusterChild>
  );
};

const IndicatorIcon = ({ icon: Icon = RefreshCcw, loading, rotate }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1200, easing: Easing.linear }),
        -1, // Infinite loop
        false // No reverse
      );
    } else {
      if (rotation.value > 0) {
        rotation.value = withTiming(360, {
          duration: 1200,
          easing: Easing.linear,
        });
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
      <AdaptiveElement styles={{ opacity: 0.7 }}>
        <Icon size={20} />
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
