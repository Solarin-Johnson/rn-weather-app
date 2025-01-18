import React, { useEffect, useState } from "react";
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
import { Link } from "expo-router";
import { calculateAQI, getHighestValue } from "../functions";
import generalStyles from "../styles/styles";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const popularCitiesList = [
  { id: 1, name: "London" },
  { id: 2, name: "Paris" },
  { id: 3, name: "New York" },
  { id: 4, name: "Tokyo" },
];

export const PopularCities = () => {
  const { themeColors } = useTheme();

  const [popularCities, setPopularCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        {popularCities.map((city) => {
          if (loading) {
            return <LoaderCard key={city.id} />;
          }
          return (
            <CityCard
              key={city.id}
              city={city}
              onPress={() => console.log(`Selected ${city.name}`)}
            />
          );
        })}
      </View>
    </View>
  );
};

const CityCard = ({ city, onPress }) => {
  const { themeColors } = useTheme();
  const { width } = useWindowDimensions();
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

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
          backgroundColor: themeColors.fg + "bc",
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
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={100}
      // viewBox="0 0 400 90"
      backgroundColor={themeColors.fg}
      foregroundColor={themeColors.bg + "20"}
      {...props}
    >
      <Rect x="0" y="0" rx="12" ry="12" width="100%" height={80} />
    </ContentLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: "100%",
    // maxWidth: 450,
    gap: 16,
    alignSelf: "center",
    marginTop: 8,
    flex: 1,
    // paddingBottom: 400,
  },
  cardContainer: {
    padding: 18,
    width: "100%",
    marginBottom: 16,
    borderRadius: 12,
    display: "flex",
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
