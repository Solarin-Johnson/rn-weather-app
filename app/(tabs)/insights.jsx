import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";
import HomeHeader from "../../components/HomeHeader";
import generalStyles from "../../styles/styles";
import { useWeather } from "../../context/WeatherContext";
import WeatherDetails from "../../components/Weather/Details";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Tab() {
  const [screenScrollY, setScreenScrollY] = useState(0);
  const { width } = useWindowDimensions();
  const { fetchWeather } = useWeather();
  const wide = width > 760;

  const refreshAction = async () => {
    await fetchWeather();
  };

  return (
    <Screen
      style={styles.container}
      title={"Weather Insights"}
      alwaysShowHeader
      transitHeader
      refreshProps={{
        progressViewOffset: 20,
      }}
    >
      <InsightBody {...{ setScreenScrollY, wide }} />
    </Screen>
  );
}

export const InsightBody = ({ screenScrollY, setScreenScrollY }) => {
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();
  const { wide } = useTheme();

  return (
    <View
      style={[
        generalStyles.screen,
        {
          justifyContent: wide ? "center" : "flex-start",
        },
      ]}
    >
      <WeatherDetails
        weather={currentWeather}
        forcast={futureWeather}
        currentLoc={currentWeatherLoc}
      />
    </View>
  );
};

const InsightHeader = ({ height = 92, wide }) => {
  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: height,
          justifyContent: wide ? "flex-end" : "center",
        },
      ]}
    >
      <ThemeText
        styles={{
          textAlign: wide ? "left" : "center",
          paddingLeft: wide ? 24 : 0,
          fontSize: wide ? 23 : 20,
        }}
      >
        Weather Insights
      </ThemeText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    maxHeight: "100%",
  },
});
