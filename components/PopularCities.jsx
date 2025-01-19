import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ThemeText } from "./ThemeComponents";
import { CloudRain, Sun, Cloud } from "lucide-react-native";
import { searchCurrentWeather } from "../api";
import WeatherIcon from "./WeatherIcon";
import { Link, useFocusEffect } from "expo-router";
import { calculateAQI, getHighestValue } from "../functions";
import generalStyles from "../styles/styles";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";

const popularCitiesList = [
  { id: 1, name: "London" },
  { id: 2, name: "Paris" },
  { id: 3, name: "New York" },
  { id: 4, name: "Tokyo" },
];

export const PopularCities = () => {
  const { themeColors } = useTheme();

  const [popularCities, setPopularCities] = useState(popularCitiesList);
  const [loading, setLoading] = useState(true);

  const fetchCitiesWeather = async () => {
    setLoading(true);
    const cities = await Promise.all(
      popularCitiesList.map(async (city) => {
        const weather = await searchCurrentWeather(city.name);
        return {
          ...city,
          temp: `${Math.round(weather.current.temp_c)}°`,
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
            entering={Platform.OS !== "web" ? FadeInDown.delay(30 * i) : FadeIn}
          >
            {loading ? (
              <LoaderCard />
            ) : (
              <CityCard
                city={city}
                onPress={() => console.log(`Selected ${city.name}`)}
              />
            )}
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const CityCard = ({ city, onPress }) => {
  const { themeColors } = useTheme();
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
          backgroundColor: themeColors.textFade + "10",
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
  const { themeColors } = useTheme();
  const { length = 1 } = props;
  return (
    <>
      {[...Array(length)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width={"100%"}
          height={94}
          backgroundColor={themeColors.fg}
          foregroundColor={themeColors.bg + "20"}
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
    // paddingVertical: 16,
    width: "100%",
    // maxWidth: 450,
    gap: 16,
    alignSelf: "center",
    // marginTop: 8,
    flex: 1,
    // paddingBottom: 400,
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
