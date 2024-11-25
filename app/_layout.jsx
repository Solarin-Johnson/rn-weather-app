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

export default function Layout() {
  const [location, setLocation] = useState(null);
  const platform = getPlatform();
  const { width } = useWindowDimensions();

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
    <ThemeProvider>
      <UserProvider>
        <WeatherProvider>
          <Stack
            screenOptions={{
              headerTitle: "",
              headerTransparent: true,
            }}
          >
            <Stack.Screen name="(tabs)" />
            {/* <Stack.Screen
            name="permission"
            options={{
              headerShown: false,
              }}
              /> */}
          </Stack>
        </WeatherProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
