import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Screen } from "../../components/Screens";
import generalStyles from "../../styles/styles";
import HomeHeader from "../../components/HomeHeader";
import { useUser } from "../../context/UserContext";
import { useWeather } from "../../context/WeatherContext";
import CloudBg from "../../components/CloudBg";
import { useTheme } from "../../context/ThemeContext";
import WeatherMain from "../../components/Weather/Main";
import WeatherFuture from "../../components/Weather/Future";
import WeatherDetails from "../../components/Weather/Details";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import { ChevronsDown } from "lucide-react-native";
import { useBottomSheet } from "../../context/BottomSheetContext";
import { calculateClamp } from "../../hooks/useClamp";

export default function Tab() {
  const { themeColors } = useTheme();
  const { setBottomSheet } = useBottomSheet();
  const { location } = useUser();
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();
  const { width, height } = useWindowDimensions();
  const wide = width > 720;

  return (
    <Screen styles={styles.container} header={<HomeHeader />}>
      {!wide && <CloudBg />}
      <View style={generalStyles.container}>
        <WeatherMain
          {...{ currentWeather, futureWeather, currentWeatherLoc, themeColors }}
        />
        <WeatherFuture
          {...{ futureWeather, currentWeather, currentWeatherLoc }}
        />
        {wide && (
          <WeatherDetails
            weather={currentWeather}
            forcast={futureWeather}
            currentLoc={currentWeatherLoc}
            hasMargin
          />
        )}
        {!wide && (
          <DetailsBtn
            onPress={() =>
              setBottomSheet(
                <WeatherDetails
                  weather={currentWeather}
                  forcast={futureWeather}
                  currentLoc={currentWeatherLoc}
                  isBottomSheet
                />
              )
            }
            style={{ marginTop: height > 960 ? 10 : 0 }}
          />
        )}

        {/* <WeatherFuture /> */}
      </View>
    </Screen>
  );
}

const DetailsBtn = ({ onPress, style }) => {
  const { themeColors } = useTheme();
  return (
    <Pressable
      style={[styles.details, style]}
      android_ripple={{
        color: themeColors?.text + "22",
        borderless: false,
      }}
      onPress={onPress}
    >
      <ThemeText styles={{ fontSize: 15, fontWeight: 500 }}>
        More Details
      </ThemeText>
      <AdaptiveElement>
        <ChevronsDown
          size={16}
          style={{
            opacity: 0.9,
          }}
        />
      </AdaptiveElement>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: "100%",
    // flexDirection: "row",
  },
  details: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 18,
    paddingBottom: 48,
    borderRadius: 50,
    maxWidth: 300,
    width: "100%",
    alignSelf: "center",
    opacity: 0.8,
  },
});
