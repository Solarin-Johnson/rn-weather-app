import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MyTabBar from "../components/TabBar";
import { Home, Search, Sparkles, User2 } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";

export default function TabLayout() {
  const { themeColors } = useTheme();
  const config = {
    size: 28,
    strokeWidth: 2.1,
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarPosition: "left",
        }}
        sceneContainerStyle={{
          backgroundColor: themeColors?.bg,
          alignContent: "start",
          flex: 1,
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          title="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, fill }) => (
              <Home color={color} fill={fill} {...config} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, fill }) => (
              <Search color={color} fill={fill} {...config} />
            ),
          }}
        />
        <Tabs.Screen
          name="suggestions"
          options={{
            title: "Suggestions",
            tabBarIcon: ({ color, fill }) => (
              <Sparkles color={color} fill={fill} {...config} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, fill }) => (
              <User2 color={color} fill={fill} {...config} />
            ),
            tabBarBadge: 3,
          }}
        />
      </Tabs>
    </View>
  );
}
