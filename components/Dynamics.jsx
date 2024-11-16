import useClamp from "@/hooks/useClamp";
import { View } from "react-native";

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
  const clampedValue = useClamp(...clamp);
  console.log(clampedValue);

  return (
    <View
      style={[
        {
          padding: clampedValue,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
