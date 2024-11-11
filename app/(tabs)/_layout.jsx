import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MyTabBar from "../../components/TabBar";
import { Home, Search, Sparkles, User2 } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";

export default function TabLayout() {
  const { themeColors } = useTheme();
  const config = {
    size: 24,
    // color: "red",
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        title="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home {...config} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search {...config} />,
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: "Suggestions",
          tabBarIcon: ({ color }) => <Sparkles {...config} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User2 {...config} />,
          tabBarBadge: 3,
        }}
      />
    </Tabs>
  );
}
