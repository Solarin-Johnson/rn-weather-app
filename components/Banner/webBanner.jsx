import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  PixelRatio,
  ScrollView,
} from "react-native";
import { DynamicText, DynamicView } from "../Dynamics";
import useClamp, { calculateClamp } from "../../hooks/useClamp";
import CloudBg from "../CloudBg";
import { useTheme } from "../../context/ThemeContext";
import { AdaptiveElement, ThemeText } from "../ThemeComponents";
import { useWeather } from "../../context/WeatherContext";
import { calculateUnits, formatDate, getWeatherIcon } from "../../functions";
import { useUser } from "../../context/UserContext";
import { Image } from "expo-image";

const WebBanner = () => {
  const { width, height } = useWindowDimensions();
  const { themeColors } = useTheme();

  return (
    <ScrollView
      style={{
        maxWidth: width - calculateClamp(width, 340, "42%", 620),
      }}
      contentContainerStyle={{
        height: "100%",
        minHeight: 280,
      }}
      showsVerticalScrollIndicator={false}
    >
      <DynamicView
        style={[
          styles.banner,
          {
            paddingTop: 60 + calculateClamp(width, 10, "3%", 60) + 5,
            // alignItems: "flex-start",
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={{
            paddingBottom: calculateClamp(height, 10, "15%", 100),
            paddingRight: calculateClamp(width, 20, "5%", 100),
          }}
        >
          <BannerLantern />
          <BannerDetails />
        </View>
      </DynamicView>
    </ScrollView>
  );
};

const BannerLantern = () => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        alignItems: width > 1024 ? "flex-end" : "center",
        paddingLeft: width > 1024 && calculateClamp(width, 320, "24%", 485),
        paddingVertical: 15,
        // height: 320,
      }}
    >
      <Image
        style={{
          width: calculateClamp(width, 200, "25%", 480),
          aspectRatio: 1,
        }}
        source={require("../../assets/hot-air-balloon.png")}
        contentFit="contain"
        cachePolicy="disk"
        transition={500}
      />
    </View>
  );
};

const BannerDetails = () => {
  const { currentWeather, currentWeatherLoc } = useWeather();
  const { measurement } = useUser();
  const { themeColors } = useTheme();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: calculateClamp(width, 12, "1.2%", 30),
      }}
    >
      <DynamicText
        clamp={[54, "6%", 130]}
        styles={{
          textAlign: "center",
          marginBottom: -calculateClamp(width, 0, "1.1%", 28),
        }}
      >
        {parseInt(
          calculateUnits(currentWeather?.temp_c, measurement.temperatureUnit)
        )}
        <Text
          style={{
            // color: themeColors.primary,
            fontWeight: 600,
          }}
        >
          °
        </Text>
      </DynamicText>
      <BannerDetailsCard
        topText={currentWeatherLoc.region}
        bottomText={formatDate(currentWeatherLoc?.localtime)}
      />
      <BannerDetailsCard
        topText={
          <AdaptiveElement>
            {getWeatherIcon({
              code: currentWeather?.condition?.code,
              size: calculateClamp(width, 30, "3%", 40),
              strokeWidth: 1.8,
            })}
          </AdaptiveElement>
        }
        bottomText={currentWeather?.condition?.text}
        style={{
          marginLeft: calculateClamp(width, 10, "1%", 20),
          alignItems: "center",
        }}
      />
    </View>
  );
};

const BannerDetailsCard = ({ topText, bottomText, style }) => {
  return (
    <View
      style={[
        {
          alignItems: "flex-start",
        },
        style,
      ]}
    >
      <DynamicText clamp={[20, "2.4%", 42]} styles={styles.text}>
        {topText}
      </DynamicText>
      <DynamicText clamp={[15, "1%", 20]} styles={styles.bottomText}>
        {bottomText}
      </DynamicText>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    zIndex: 0,
    left: 0,
    top: 0,
    padding: 20,
    alignItems: "center",
    height: "100%",
  },
  text: {},
  bottomText: {
    fontWeight: 400,
    opacity: 0.85,
    // fontSize: 18,
  },
});

export default WebBanner;
