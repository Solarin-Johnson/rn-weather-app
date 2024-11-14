import { Image } from "expo-image";
import React from "react";
import { View, StyleSheet } from "react-native";

const WeatherIcon = ({ icon }) => {
  return (
    <View style={styles.container}>
      <Image source={iconSource[icon]} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherIcon;
