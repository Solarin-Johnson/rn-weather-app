import {
  PixelRatio,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
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
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useNotification } from "../../context/NotificationContext";
import NotificationExample from "../test";

export default function Tab() {
  const { themeColors } = useTheme();
  const { setBottomSheet } = useBottomSheet();
  const { location } = useUser();
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();
  const { width, height } = useWindowDimensions();
  const [screenDim, setScreenDim] = useState({ width, height });
  const wide = width > 740;
  const { sendNotification } = useNotification();

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendNotification("Hello", "This is a test notification", {});
  //   }, 2000);
  // }, []);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setScreenDim({ width, height });
  };

  const refreshAction = async () => {
    await fetchWeather();
  };

  return (
    <Screen header={<HomeHeader />} reRender={false}>
      <View style={styles.container}>
        {!wide && <CloudBg />}
        <View
          style={[
            generalStyles.screen,
            {
              alignContent: "center",
            },
          ]}
        >
          <WeatherMain
            {...{
              currentWeather,
              futureWeather,
              currentWeatherLoc,
              themeColors,
            }}
          />
          {/* <NotificationExample /> */}
          <View
            style={{
              flex: 1,
              marginTop: 80 - PixelRatio.getPixelSizeForLayoutSize(20),
              justifyContent: "flex-end",
            }}
          >
            <WeatherFuture
              {...{ futureWeather, currentWeather, currentWeatherLoc }}
            />
            {
              <View
                style={{
                  marginTop: 42,
                  width: "100%",
                  maxWidth: 430,
                  alignSelf: "center",
                }}
              >
                <WeatherDetails
                  weather={currentWeather}
                  currentLoc={currentWeatherLoc}
                  hasMargin
                />
              </View>
            }
          </View>
        </View>
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
    flex: 1,
    justifyContent: "center",
  },
  details: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 18,
    borderRadius: 50,
    maxWidth: 300,
    width: "100%",
    alignSelf: "center",
    opacity: 0.8,
  },
});
