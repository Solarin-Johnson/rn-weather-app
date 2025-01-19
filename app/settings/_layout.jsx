import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsLayout() {
  const { themeColors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.bgFade,
          shadowColor: "transparent",
        },
        headerTintColor: themeColors.text,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
    </Stack>
  );
}
