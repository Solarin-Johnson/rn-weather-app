import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import WeatherIcon from "../WeatherIcon";
import { ThemeText } from "../ThemeComponents";
import { calculateClamp } from "../../hooks/useClamp";
import { useTheme } from "../../context/ThemeContext";

export default function WeatherMain({ currentWeather: current }) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { condition } = current || {};
  const wide = width > 720;

  return (
    <View style={styles.body}>
      <WeatherIcon
        code={condition?.code}
        isDay={current?.is_day}
        size={wide ? 200 : calculateClamp(width, 0, "60%", 300)}
      />
      <ThemeText
        styles={{
          fontSize: 18,
          opacity: 0.8,
          textAlign: "center",
        }}
      >
        {condition?.text}
      </ThemeText>
      <ThemeText
        styles={{
          fontSize: 92,
          lineHeight: 108,
          textAlign: "center",
        }}
      >
        {current?.temp_c.toFixed(0)}
        <Text style={{ color: themeColors.primary }}>°</Text>
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: "red",
    flex: 1,
    // height: "100%",
    paddingVertical: 24,
  },
});
