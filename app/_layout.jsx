import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { getData } from "@/functions";
import { Platform, useWindowDimensions, View } from "react-native";
import { getPlatform } from "../functions";
import { WeatherProvider } from "../context/WeatherContext";
import { BottomSheetProvider } from "../context/BottomSheetContext";
import { useTheme } from "../context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SearchProvider } from "../context/SearchContext";
import { NotificationProvider } from "../context/NotificationContext";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import EditName from "./name";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Layout() {
  const [location, setLocation] = useState(null);
  const platform = getPlatform();

  useEffect(() => {
    getData("location").then((location) => {
      if (location) {
        setLocation(location);
      } else {
        setLocation(false);
      }
    });
  }, []);

  if (location === null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <NotificationProvider>
            <ThemeProvider>
              <UserProvider>
                <WeatherProvider>
                  <SearchProvider>
                    <BottomSheetProvider>
                      <CustomTabs />
                    </BottomSheetProvider>
                  </SearchProvider>
                </WeatherProvider>
              </UserProvider>
            </ThemeProvider>
          </NotificationProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

const CustomTabs = () => {
  const { themeColors, wide } = useTheme();

  const icons = {
    clear: Asset.fromModule(require("../assets/iconPacks/clear.png")),
    cloudy: Asset.fromModule(require("../assets/iconPacks/cloudy.png")),
    foggy: Asset.fromModule(require("../assets/iconPacks/foggy.png")),
    lightPrecipitation: Asset.fromModule(
      require("../assets/iconPacks/lightPrecipitation.png")
    ),
    heavyPrecipitation: Asset.fromModule(
      require("../assets/iconPacks/heavyPrecipitation.png")
    ),
    freezing: Asset.fromModule(require("../assets/iconPacks/freezing.png")),
    thunderstorms: Asset.fromModule(
      require("../assets/iconPacks/thunderstorms.png")
    ),
    icePellets: Asset.fromModule(require("../assets/iconPacks/icePellets.png")),
    bg: Asset.fromModule(require("../assets/nature_day.webp")),
  };

  const preloadAssets = async () =>
    Promise.all(Object.values(icons).map((asset) => asset.downloadAsync()));

  useEffect(() => {
    preloadAssets().then(() => {
      if (themeColors) {
        SplashScreen.hideAsync();
      }
    });
  }, [themeColors, preloadAssets]);

  const isWeb = Platform.OS === "web";
  const isTransparent = isWeb || !wide;

  const sheetOptionsConfig = {
    presentation: "transparentModal",
    animation: "fade",
    sheetAllowedDetents: wide ? [1.0] : [0.55, 1.0],
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: themeColors.bg,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="display"
          options={{
            title: "Display",
            ...sheetOptionsConfig,
          }}
        />
        <Stack.Screen
          name="measurement"
          options={{
            title: "Measurement",
            ...sheetOptionsConfig,
          }}
        />
        <Stack.Screen
          name="name"
          options={{
            title: "Change Name",
            ...sheetOptionsConfig,
            // sheetAllowedDetents: [0.3, 1],
          }}
        />
      </Stack>
    </View>
  );
};
