import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Screen } from "../../components/Screens";
import generalStyles from "../../styles/styles";
import HomeHeader from "../../components/HomeHeader";
import { useUser } from "../../context/UserContext";
import { useWeather } from "../../context/WeatherContext";
import CloudBg from "../../components/CloudBg";
import { useTheme } from "../../context/ThemeContext";
import WeatherMain from "../../components/Weather/Main";
import WeatherFuture from "../../components/Weather/Future";

export default function Tab() {
  const { themeColors } = useTheme();
  const { location } = useUser();
  const { currentWeather } = useWeather();
  const { width } = useWindowDimensions();
  const wide = width > 720;

  return (
    <Screen styles={styles.container} header={<HomeHeader />}>
      {!wide && <CloudBg />}
      <View style={generalStyles.container}>
        <WeatherMain {...{ currentWeather, themeColors }} />
        <WeatherFuture />
        <WeatherFuture />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // minHeight: "100%",
    // flexDirection: "row",
  },
});
