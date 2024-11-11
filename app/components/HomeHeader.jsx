import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import { getDate } from "../functions";
import { MapPin } from "lucide-react-native";
import { useUser } from "../context/userContext";

const HomeHeader = () => {
  const { location } = useUser();
  const { city, country } = location;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ThemeText styles={{ fontSize: 17, opacity: 0.8 }}>
          {getDate()}
        </ThemeText>
        <View style={styles.locationSection}>
          <AdaptiveElement>
            <MapPin size={18} />
          </AdaptiveElement>
          <ThemeText styles={{ fontSize: 17 }}>{city} </ThemeText>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  subContainer: {
    gap: 4,
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});
