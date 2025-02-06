import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ThemeText } from "./ThemeComponents";
import { CloudRain, Sun, Cloud } from "lucide-react-native";
import { searchCurrentWeather } from "../api";
import WeatherIcon from "./WeatherIcon";
import { Link, useFocusEffect } from "expo-router";
import {
  calculateAQI,
  calculateUnits,
  defaultAnimation,
  getHighestValue,
} from "../functions";
import generalStyles from "../styles/styles";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";
import { useUser } from "../context/UserContext";

const popularCitiesList = [
  { id: 1, name: "London" },
  { id: 2, name: "Paris" },
  { id: 3, name: "New York" },
  { id: 4, name: "Tokyo" },
];

export const PopularCities = forwardRef((props, ref) => {
  const { themeColors } = useTheme();

  const [popularCities, setPopularCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { measurement } = useUser();

  const fetchCitiesWeather = async () => {
    setPopularCities([]);
    await new Promise((resolve) => {
      setTimeout(() => {
        setPopularCities(popularCitiesList);
        resolve();
      }, 0);
    });
    setLoading(true);
    const cities = await Promise.all(
      popularCitiesList.map(async (city) => {
        const weather = await searchCurrentWeather(city.name);
        return {
          ...city,
          temp: `${Math.round(calculateUnits(weather.current.temp_c, measurement.temperatureUnit))}°`,
          code: weather.current.condition.code,
          isDay: weather.current.is_day,
          country: weather.location.country,
          // aqi: calculateAQI(weather.current.air_quality),
        };
      })
    );
    setPopularCities(cities);
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchCitiesWeather();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchCitiesWeather,
  }));

  return (
    <View style={styles.container}>
      <ThemeText
        styles={[
          generalStyles.title,
          {
            fontSize: 15,
          },
        ]}
      >
        Popular Cities
      </ThemeText>
      <View style={styles.grid}>
        {popularCities.map((city, i) => (
          <Animated.View
            key={i}
            style={{ width: "100%" }}
            entering={defaultAnimation(i, FadeIn, FadeInDown)}
          >
            {loading ? <LoaderCard /> : <CityCard city={city} />}
          </Animated.View>
        ))}
      </View>
    </View>
  );
});

const CityCard = ({ city, onPress }) => {
  const { themeColors, wide } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <Link
      href={{
        pathname: "/search",
        params: { q: city.name },
      }}
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          backgroundColor: wide ? themeColors?.bg + "40" : themeColors?.fg,
        },
      ]}
    >
      <View style={styles.card}>
        <WeatherIcon code={city.code} isDay={city.isDay} size={42} />

        <View style={{ gap: 4 }}>
          <ThemeText styles={styles.cityName}>{city.name}</ThemeText>
          <ThemeText styles={styles.aqi}>{city.country}</ThemeText>
        </View>
        <View style={{ flex: 1 }}>
          <ThemeText styles={styles.temperature}>{city.temp}</ThemeText>
        </View>
      </View>
    </Link>
  );
};

const LoaderCard = (props) => {
  const { themeColors, wide } = useTheme();
  const { length = 1 } = props;
  return (
    <>
      {[...Array(length)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width={"100%"}
          height={100}
          backgroundColor={themeColors.fg + (wide ? "40" : "")}
          foregroundColor={themeColors.bg + "10"}
          {...props}
        >
          <Rect x="0" y="0" rx="12" ry="12" width="100%" height={80} />
        </ContentLoader>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    alignSelf: "center",
    flex: 1,
  },
  cardContainer: {
    padding: 18,
    flex: 1,
    width: "100%",
    marginBottom: 16,
    borderRadius: 12,
    display: "flex",
    alignItems: "flex-start",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
  },
  cityName: {
    fontSize: 15,
  },
  aqi: {
    fontSize: 12,
    opacity: 0.65,
  },
  temperature: {
    fontSize: 28,
    opacity: 0.9,
    width: "100%",
    textAlign: "right",
  },
});

export default PopularCities;
