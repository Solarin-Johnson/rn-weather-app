import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import WeatherIcon from "../WeatherIcon";
import { ThemeText } from "../ThemeComponents";
import { calculateClamp } from "../../hooks/useClamp";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

export default function WeatherMain({ currentWeather: current }) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { preferences } = useUser();
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <ThemeText
          styles={{
            fontSize: 92,
            lineHeight: 108,
            textAlign: "center",
          }}
        >
          {current?.temp_c.toFixed(0)}
        </ThemeText>
        <Text
          style={{ color: themeColors.primary, fontSize: 60, marginTop: 4 }}
        >
          °
        </Text>
        <Text
          style={{
            color: themeColors.primary,
            fontSize: 56,
            fontWeight: 500,
            marginTop: -3,
          }}
        >
          {preferences?.metric ? "c" : "f"}
        </Text>
      </View>
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
