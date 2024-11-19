import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { dpToPercentage } from "../functions";
import { useTheme } from "../context/ThemeContext";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";

const Switch = ({
  initialValue = false,
  onValueChange = () => {},
  toggleComponent,
}) => {
  const { themeColors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const { leftIcon = null, rightIcon = null } = toggleComponent || {};
  const [switchWidth, setSwitchWidth] = useState(80);
  const switchTransform = useSharedValue(
    initialValue ? switchWidth / 2 - 2 : 0
  );

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setSwitchWidth(width);
  };

  const config = {
    mass: 0.6,
    damping: 18,
    stiffness: 150,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onValueChange(!isEnabled);
  };

  useFocusEffect(() => {
    switchTransform.value = withSpring(
      initialValue ? switchWidth / 2 - 2 : 0,
      config
    );
  });

  useLayoutEffect(() => {
    switchTransform.value = initialValue ? switchWidth / 2 - 2 : 0;
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: switchTransform.value,
        },
      ],
    };
  });

  return (
    <View style={customStyles.container}>
      <Pressable
        style={[
          customStyles.switch,
          {
            borderColor: themeColors?.textFade + "50",
          },
        ]}
        onPress={toggleSwitch}
        onLayout={onLayout}
      >
        {leftIcon && (
          <View style={customStyles.switchNode}>
            {leftIcon({
              color: "#ffffff",
            })}
          </View>
        )}

        {rightIcon && (
          <View style={customStyles.switchNode}>
            {rightIcon({ color: "#000000" })}
          </View>
        )}

        <Animated.View
          style={[
            customStyles.thumb,
            animatedStyles,
            {
              width: switchWidth / 2 - 8,
              backgroundColor: themeColors?.primary,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
  switch: {
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1.5,
    width: 80,
    justifyContent: "space-between",
  },
  switchNode: {
    aspectRatio: 1,
    padding: 7,
    margin: 3.5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  switchEnabled: {
    backgroundColor: "#81b0ff",
  },
  switchDisabled: {
    backgroundColor: "#767577",
  },
  thumb: {
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 50,
    alignSelf: "center",
    margin: 3.5,
    zIndex: -1,
    // left: 4,
    // top: 4,
  },
  thumbEnabled: {
    right: 0,
  },
  thumbDisabled: {
    left: 0,
  },
});

export default Switch;
