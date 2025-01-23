import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import WeatherIcon from "../WeatherIcon";
import { ThemeText } from "../ThemeComponents";
import { calculateClamp } from "../../hooks/useClamp";
import { useTheme } from "../../context/ThemeContext";
import { extractTime, toEpoch } from "../../api";
import { useWeather } from "../../context/WeatherContext";
import { useUser } from "../../context/UserContext";
import { calculateUnits } from "../../functions";

export default function WeatherMini({
  currentWeather: current,
  now,
  realProps,
  stylesProp: _styles,
  absolute,
}) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { condition } = realProps || current || {};
  const { measurement } = useUser();

  return (
    <View style={[styles.body, _styles?.body]}>
      <WeatherIcon
        absolute={absolute}
        code={condition?.code}
        isDay={current?.is_day}
        size={calculateClamp(width, 50, "14%", _styles?.icon || 60)}
        style={{ filter: Platform.OS !== "ios" ? "blur(0.51px)" : "" }}
      />
      <ThemeText
        styles={{
          fontSize: 13,
          textAlign: "center",
          opacity: 0.8,
          lineHeight: 24,
        }}
      >
        {realProps?.title ||
          (now ? "Now" : extractTime(toEpoch(current.time)).toLowerCase())}
      </ThemeText>
      <ThemeText
        styles={[
          {
            fontSize: 18,
            //   lineHeight: 108,
            textAlign: "center",
          },
          _styles?.temp,
        ]}
      >
        {realProps?.temp ||
          parseInt(
            calculateUnits(current?.temp_c, measurement.temperatureUnit)
          ) + "°"}
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: "red",
    flex: 1,
    // alignSelf: "center",
    // height: "100%",
    // paddingBottom: 24,
  },
});
