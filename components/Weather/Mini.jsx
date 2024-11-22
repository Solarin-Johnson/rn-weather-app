import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import WeatherIcon from "../WeatherIcon";
import { ThemeText } from "../ThemeComponents";
import { calculateClamp } from "../../hooks/useClamp";
import { useTheme } from "../../context/ThemeContext";
import { extractTime } from "../../api";
import { useWeather } from "../../context/WeatherContext";

export default function WeatherMini({ currentWeather: current, now }) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { condition } = current || {};
  const wide = width > 720;

  return (
    <View style={styles.body}>
      <WeatherIcon
        code={condition?.code}
        isDay={current?.is_day}
        size={calculateClamp(width, 0, "13%", 60)}
        style={{ filter: "blur(0.5px)" }}
      />
      <ThemeText
        styles={{
          fontSize: 13,
          textAlign: "center",
          opacity: 0.8,
          lineHeight: 24,
        }}
      >
        {now ? "Now" : extractTime(current?.time_epoch).toLowerCase()}
      </ThemeText>
      <ThemeText
        styles={{
          fontSize: 18,
          //   lineHeight: 108,
          textAlign: "center",
        }}
      >
        {current?.temp_c.toFixed(0)}°
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: "red",
    flex: 1,
    alignSelf: "center",
    height: "100%",
    paddingVertical: 24,
  },
});
