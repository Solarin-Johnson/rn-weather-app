import { Tabs, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MyTabBar from "@/components/TabBar";
import { Home, Search, Sparkles, User2 } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import generalStyles from "@/styles/styles";
import { useLayoutEffect } from "react";
import { ThemeText, ThemeScreen } from "@/components/ThemeComponents";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const { themeColors } = useTheme();
  const { location } = useUser();
  const navigation = useNavigation();
  const router = useRouter();

  const config = {
    size: 28,
    strokeWidth: 1.9,
  };

  useLayoutEffect(() => {
    if (location === "denied") {
      router.replace("/manualLocation");
    }
  }, [location, router]);

  useLayoutEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, 0);
  }, [navigation]);

  if (location !== "denied") {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: themeColors?.bg,
          },
        ]}
      >
        <SafeAreaView style={generalStyles.screen}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarPosition: "left",
            }}
            sceneContainerStyle={{
              backgroundColor: "transparent",
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
        </SafeAreaView>
      </View>
    );
  }
}
