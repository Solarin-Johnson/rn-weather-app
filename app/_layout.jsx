import { Stack, useRouter } from "expo-router/stack";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { getData } from "@/functions";
import { Home } from "lucide-react-native";
import HomeHeader from "../components/HomeHeader";
import { Platform, useWindowDimensions, View } from "react-native";
import { getPlatform } from "../functions";
import WebBanner from "../components/webBanner";
import { WeatherProvider } from "../context/WeatherContext";
import { BgCloud } from "../styles/icons";
import { BottomSheetProvider } from "../context/BottomSheetContext";
import {
  NavigationContainer,
  DefaultTheme,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SearchProvider } from "../context/SearchContext";
import { NotificationProvider } from "../context/NotificationContext";

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
  );
}

const CustomTabs = () => {
  const { themeColors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.bg,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            presentation: Platform.OS === "ios" ? "modal" : "transparentModal",
            animation: "fade_from_bottom",
          }}
        />
      </Stack>
    </View>
  );
};
