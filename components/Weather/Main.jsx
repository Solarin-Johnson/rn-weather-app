import {
  Dimensions,
  PixelRatio,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import WeatherIcon from "../WeatherIcon";
import { ThemeText } from "../ThemeComponents";
import { calculateClamp } from "../../hooks/useClamp";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { useBottomSheet } from "../../context/BottomSheetContext";
import WeatherDetails from "./Details";
import { calculateUnits } from "../../functions";

export default function WeatherMain({ currentWeather: current }) {
  const { width } = useWindowDimensions();
  const { themeColors, wide } = useTheme();
  const { measurement } = useUser();
  const { condition } = current || {};
  const unit =
    measurement.temperatureUnit.toLowerCase() === "celsius" ? "c" : "f";

  return (
    <View
      style={[
        styles.body,
        {
          maxHeight: wide
            ? 380
            : 1160 - PixelRatio.getPixelSizeForLayoutSize(270),
        },
      ]}
    >
      <Pressable
        style={{
          height:
            Platform.OS === "web"
              ? wide
                ? 210
                : 180
              : PixelRatio.getPixelSizeForLayoutSize(wide ? 145 : 80),
          maxHeight: wide && 205,
        }}
        // onPress={() => {
        //   !wide &&
        //     setBottomSheet(
        //       <WeatherDetails
        //         {...{ weather: current }}
        //         forcast={futureWeather.forecastday}
        //         isBottomSheet
        //       />
        //     );
        // }}
      >
        <WeatherIcon
          code={condition?.code}
          isDay={current?.is_day}
          size={
            wide
              ? calculateClamp(width, 210, "20%", 240)
              : calculateClamp(width, 0, "60%", 210)
          }
        />
      </Pressable>
      <View
        style={{
          height: 160,
          justifyContent: "flex-end",
        }}
      >
        <ThemeText
          styles={{
            fontSize: 18.5,
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          {condition?.text}
        </ThemeText>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            position: "relative",
          }}
        >
          <ThemeText
            styles={{
              fontSize: 92,
              lineHeight: 115,
              textAlign: "center",
            }}
          >
            {parseInt(
              calculateUnits(current?.temp_c, measurement.temperatureUnit)
            )}
            <Text style={{ color: themeColors.primary }}>°</Text>
          </ThemeText>
          {/* {unit === "f" && (
            <ThemeText
              styles={{
                fontSize: 92, // Smaller font size
                lineHeight: 115,
                opacity: 0.85,
                // fontWeight: "700",
                // lineHeight: PixelRatio.getPixelSizeForLayoutSize(45),
              }}
            >
              {unit.toUpperCase()}
            </ThemeText>
          )} */}
        </View>
      </View>
    </View>
  );
}

export function WeatherSearchMain({ currentWeather: current }) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { preferences } = useUser();
  const { condition } = current || {};
  const { setBottomSheet } = useBottomSheet();
  const wide = width > 720;

  return (
    <View style={styles.searchBody}>
      <Pressable>
        <WeatherIcon
          code={condition?.code}
          isDay={current?.is_day}
          size={wide ? 180 : calculateClamp(width, 0, "50%", 180)}
        />
      </Pressable>
      <View style={[styles.searchReadings]}>
        <View>
          <ThemeText
            styles={{
              fontSize: 46,
              textAlign: "center",
            }}
          >
            {current?.temp_c.toFixed(0)}
            <Text style={{ color: themeColors.primary }}>°</Text>
          </ThemeText>
        </View>
        <ThemeText
          styles={{
            fontSize: 21,
            opacity: 0.9,
          }}
        >
          {condition?.text}
        </ThemeText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
    paddingVertical: 16,
  },
  searchBody: {
    flex: 1,
  },
  searchReadings: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
