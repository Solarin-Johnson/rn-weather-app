import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsLayout() {
  const { themeColors, wide } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.bg,
          borderBottomColor: themeColors.text + "25",
        },
        headerTintColor: themeColors.text,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerShown: !wide,
      }}
    >
      <Stack.Screen
        name="name"
        options={{
          title: "Change Name",
        }}
      />
      <Stack.Screen
        name="measurement"
        options={{
          title: "Measurement",
        }}
      />
      <Stack.Screen
        name="display"
        options={{
          title: "Display",
        }}
      />
    </Stack>
  );
}
