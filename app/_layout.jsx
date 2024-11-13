import { Stack, useRouter } from "expo-router/stack";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { getData } from "./functions";
import { View } from "lucide-react-native";

export default function Layout() {
  const [location, setLocation] = useState(null);

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
      </UserProvider>
    </ThemeProvider>
  );
}
