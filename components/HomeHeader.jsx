import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import { getDate } from "../functions";
import { MapPin, Moon, Sun } from "lucide-react-native";
import { useUser } from "../context/UserContext";
import Switch from "./Switch";
import { useTheme } from "../context/ThemeContext";
import generalStyles from "../styles/styles";

const HomeHeader = () => {
  const { location } = useUser();
  const { theme, setTheme } = useTheme();
  const { city, country } = location || {};

  return (
    <View style={[generalStyles.paddedX, styles.container]}>
      <View style={styles.subContainer}>
        <ThemeText styles={{ fontSize: 17, opacity: 0.8 }}>
          {getDate()}
        </ThemeText>
        <View style={styles.locationSection}>
          <AdaptiveElement>
            <MapPin
              size={20}
              style={{
                marginTop: 3,
                marginLeft: -2,
              }}
            />
          </AdaptiveElement>
          <ThemeText
            styles={{
              fontSize: 16,
              height: 24,
              textTransform: "uppercase",
              textAlignVertical: "bottom",
            }}
          >
            {city || "..."},{" "}
          </ThemeText>
          <ThemeText
            styles={{
              fontSize: 14,
              height: "90%",
              textAlignVertical: "bottom",
              opacity: 0.8,
            }}
          >
            {country}
          </ThemeText>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Switch
          label="Dark Mode"
          initialValue={theme === "dark"}
          toggleComponent={{
            leftIcon: ({ color }) => <Sun size={17} color={color} />,
            rightIcon: ({ color }) => <Moon size={17} color={color} />,
          }}
          onValueChange={(value) => {
            setTheme(value ? "dark" : "light");
          }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  subContainer: {
    gap: 3,
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
