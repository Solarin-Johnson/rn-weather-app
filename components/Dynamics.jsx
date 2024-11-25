import useClamp from "@/hooks/useClamp";
import { useWindowDimensions, View } from "react-native";
import { calculateClamp } from "../hooks/useClamp";

export const DynamicText = ({ min, preferred, max, children, style }) => {
  const clampedValue = useClamp(min, preferred, max);

  return (
    <Text
      style={[
        style,
        {
          fontSize: clampedValue,
          // lineHeight: clampedValue * 1.4,
        },
      ]}
    >
      {children}
    </Text>
  );
};

export const DynamicView = ({ clamp = [10, "5%", 50], children, style }) => {
  const { width } = useWindowDimensions();
  const clampedValue = calculateClamp(width, ...clamp);

  return (
    <View
      style={[
        {
          width: "100%",
          padding: clampedValue,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
