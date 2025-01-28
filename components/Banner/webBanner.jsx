import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  PixelRatio,
  ScrollView,
  Pressable,
} from "react-native";
import { DynamicText, DynamicView } from "../Dynamics";
import useClamp, { calculateClamp } from "../../hooks/useClamp";
import CloudBg from "../CloudBg";
import { useTheme } from "../../context/ThemeContext";
import { AdaptiveElement, ThemeText } from "../ThemeComponents";
import { useWeather } from "../../context/WeatherContext";
import {
  calculateUnits,
  formatDate,
  getBrightness,
  getHours,
  getWeatherIcon,
} from "../../functions";
import { useUser } from "../../context/UserContext";
import { Image, ImageBackground } from "expo-image";
import { Maximize2, Minimize2 } from "lucide-react-native";
import generalStyles from "../../styles/styles";

const WebBanner = () => {
  const { width, height } = useWindowDimensions();
  const { themeColors, fullScreen, setFullScreen } = useTheme();
  const { currentWeather: current, currentWeatherLoc } = useWeather();

  const ToggleIcon = fullScreen ? Minimize2 : Maximize2;

  return (
    <View
      style={{
        width: fullScreen
          ? "100%"
          : width - calculateClamp(width, 340, "42%", 620),
      }}
    >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          minHeight: 280,
          flex: 1,
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
      <Pressable
        style={({ pressed, hovered }) => [
          styles.button(hovered ? themeColors?.bgFade : themeColors?.bg),
          pressed && generalStyles.buttonPressed,
        ]}
        onPress={() => {
          setFullScreen(!fullScreen);
        }}
      >
        <AdaptiveElement>
          <ToggleIcon size={20} />
        </AdaptiveElement>
      </Pressable>
    </View>
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
  const { themeColors, wide } = useTheme();
  const { width } = useWindowDimensions();

  const config = useMemo(() => {
    if (wide)
      return {
        color: "#ffffff",
      };
  });

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
        style={{ ...config }}
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
        config={config}
      />
      <BannerDetailsCard
        topText={getWeatherIcon({
          code: currentWeather?.condition?.code,
          size: calculateClamp(width, 30, "3%", 40),
          strokeWidth: 1.8,
        })}
        bottomText={currentWeather?.condition?.text}
        style={{
          marginLeft: calculateClamp(width, 10, "1%", 20),
          alignItems: "center",
        }}
        config={config}
      />
    </View>
  );
};

const BannerDetailsCard = ({ topText, bottomText, style, config }) => {
  return (
    <View
      style={[
        {
          alignItems: "flex-start",
        },
        style,
      ]}
    >
      <DynamicText clamp={[20, "2.4%", 42]} style={(styles.text, config)}>
        {topText}
      </DynamicText>
      <DynamicText clamp={[15, "1%", 20]} style={(styles.bottomText, config)}>
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
  button: (bg) => ({
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 14,
    zIndex: 10,
    borderRadius: 50,
    backgroundColor: bg + "ab",
  }),
});

export default WebBanner;
