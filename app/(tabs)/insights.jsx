import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";
import HomeHeader from "../../components/HomeHeader";
import generalStyles from "../../styles/styles";
import { useWeather } from "../../context/WeatherContext";
import WeatherDetails from "../../components/Weather/Details";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";
import { useEffect, useState } from "react";

export default function Tab() {
  const [screenScrollY, setScreenScrollY] = useState(0);
  const { width } = useWindowDimensions();
  const wide = width > 720;

  // console.log(screenScrollY);

  return (
    <Screen
      style={styles.container}
      // title={<InsightHeader {...{ wide }} />}
      title={"Weather Insights"}
      alwaysShowHeader
      transitHeader
    >
      <InsightBody {...{ setScreenScrollY, wide }} />
    </Screen>
  );
}

const InsightBody = ({ screenScrollY, setScreenScrollY, wide }) => {
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();

  // const derivedScrollY = useDerivedValue(() => screenScrollY.value);
  const derivedScrollY = useDerivedValue(() => {
    // Pass updates to React state using runOnJS
    runOnJS(setScreenScrollY)(screenScrollY.value);
    return screenScrollY.value;
  });

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
    // height: 64,
  },
});
