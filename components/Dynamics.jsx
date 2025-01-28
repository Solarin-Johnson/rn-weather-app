import useClamp from "@/hooks/useClamp";
import { useWindowDimensions, View } from "react-native";
import { calculateClamp } from "../hooks/useClamp";
import { ThemeText } from "./ThemeComponents";

export const DynamicText = ({
  clamp = [14, "2%", 50],
  children,
  style,
  styles,
}) => {
  const { width } = useWindowDimensions();
  const clampedValue = calculateClamp(width, ...clamp);

  return (
    <ThemeText
      style={[
        {
          fontSize: clampedValue,
        },
        styles,
        style,
      ]}
    >
      {children}
    </ThemeText>
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
