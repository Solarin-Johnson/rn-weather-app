import { Stack, useRouter } from "expo-router/stack";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { getData } from "@/functions";
import { Home } from "lucide-react-native";
import HomeHeader from "../components/HomeHeader";
import { useWindowDimensions, View } from "react-native";
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
        <ThemeProvider>
          <UserProvider>
            <WeatherProvider>
              <BottomSheetProvider>
                <CustomTabs />
              </BottomSheetProvider>
            </WeatherProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

const CustomTabs = () => {
  const { themeColors } = useTheme();
  return (
    <Tabs style={{ flex: 1, backgroundColor: themeColors?.bg }}>
      <TabSlot />
      <TabList style={{ backgroundColor: themeColors?.bg }}>
        <TabTrigger name="root" href="/" />
      </TabList>
    </Tabs>
  );
};
