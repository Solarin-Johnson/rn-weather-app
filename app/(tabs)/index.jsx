import { View, Text, StyleSheet, Button } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";
import generalStyles from "../../styles/styles";
import HomeHeader from "../../components/HomeHeader";
import Modal from "../../components/Modal";
import { useState } from "react";
import { router, useFocusEffect, usePathname } from "expo-router";
import { useUser } from "../../context/UserContext";
import WeatherIcon from "../../components/WeatherIcon";
import { useWeather } from "../../context/WeatherContext";

export default function Tab() {
  const [modalVisible, setModalVisible] = useState(false);
  const { location } = useUser();
  const { currentWeather } = useWeather();

  return (
    <Screen styles={styles.container} header={<HomeHeader />}>
      {/* <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
      <WeatherIcon
        code={currentWeather?.current.condition.code}
        isDay={currentWeather?.current.is_day}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
});
