import {
  Dimensions,
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

export default function WeatherMain({
  currentWeather: current,
  futureWeather,
}) {
  const { width } = useWindowDimensions();
  const { themeColors } = useTheme();
  const { preferences } = useUser();
  const { condition } = current || {};
  const { setBottomSheet } = useBottomSheet();
  const wide = width > 720;

  return (
    <View style={styles.body}>
      <Pressable
        style={{
          height: 210,
          // flex: 1,
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
          size={wide ? 200 : calculateClamp(width, 0, "60%", 210)}
        />
      </Pressable>
      <View>
        <ThemeText
          styles={{
            fontSize: 18,
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          {condition?.text}
        </ThemeText>
        <View>
          <ThemeText
            styles={{
              fontSize: 92,
              textAlign: "center",
            }}
          >
            {current?.temp_c.toFixed(0)}
            <Text style={{ color: themeColors.primary }}>°</Text>
          </ThemeText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: "red",
    flex: 1,
    maxHeight: 540,
    marginTop: calculateClamp(Dimensions.get("window").width, 0, "5%", 80),
    // justifyContent: "center",
    // height: "100%",
    paddingVertical: 16,
  },
});
