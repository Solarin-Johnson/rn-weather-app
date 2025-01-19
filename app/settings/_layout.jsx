import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsLayout() {
  const { themeColors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.bg,
          shadowColor: "transparent",
        },
        cardStyle: {
          backgroundColor: themeColors.bg,
        },
        headerTintColor: themeColors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
