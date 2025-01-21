import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronRight } from "lucide-react-native";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
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

export const ClusterItem = ({ text, icon: Icon, iconProps, onPress }) => {
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
        <AdaptiveElement
          styles={{
            opacity: 0.7,
          }}
        >
          <ChevronRight size={20} />
        </AdaptiveElement>
      </View>
    </ClusterChild>
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
