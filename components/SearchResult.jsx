import { useLocalSearchParams } from "expo-router";
import { BackHandler, PixelRatio, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Platform } from "react-native";
import { ThemeText } from "./ThemeComponents";
import { useWeather } from "../context/WeatherContext";
import { KeyboardController } from "react-native-keyboard-controller";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import generalStyles from "../styles/styles";
import WeatherMain, { WeatherSearchMain } from "./Weather/Main";
import WeatherDetails from "./Weather/Details";
import { getFutureWeather, searchFutureWeather } from "../api";
import CloudBg from "./CloudBg";
import Loader from "./Loader";

export default forwardRef(function SearchResult({ callback }, ref) {
  const { q, cords } = useLocalSearchParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [currentWeatherLoc, setCurrentWeatherLoc] = useState(null);
  const { setSearchQuery, addRecentSearch } = useSearch();
  const navigation = useNavigation();
  const { wide } = useTheme();

  const fetchWeather = async () => {
    searchFutureWeather(cords || q)
      .then((data) => {
        setFutureWeather(data.forecast);
        setCurrentWeather(data.current);
        setCurrentWeatherLoc(data.location);
        console.log("Search Weather data fetched:");
      })
      .catch((error) => console.error("Error fetching future weather:", error));
  };

  useImperativeHandle(ref, () => ({
    fetchWeather,
  }));

  useEffect(() => {
    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // Update every 10 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    KeyboardController.dismiss();
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate("search");
          setSearchQuery("");
          return true;
        }
      );
      return () => backHandler.remove();
    }
  }, []);

  if (!currentWeather) return <Loader full={false} noBg />;

  return (
    <View style={styles.container}>
      <ThemeText
        styles={{
          fontSize: 26,
          textAlign: "center",
          paddingTop: 24,
          paddingBottom: 12,
        }}
      >
        {q}
      </ThemeText>
      <View style={styles.content}>
        {!wide && <CloudBg />}
        <View
          style={[
            generalStyles.screen,
            {
              alignContent: "center",
            },
          ]}
        >
          <WeatherSearchMain
            {...{
              currentWeather,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                marginTop: 48,
              }}
            >
              <WeatherDetails
                weather={currentWeather}
                forcast={futureWeather}
                fill={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
