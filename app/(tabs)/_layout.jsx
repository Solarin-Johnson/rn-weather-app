import { Tabs, useFocusEffect, useNavigation, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MyTabBar from "@/components/TabBar";
import { Home, Search, Sparkles, User2 } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import generalStyles from "@/styles/styles";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebBanner from "../../components/webBanner";
import HomeHeader from "../../components/HomeHeader";
import { useBottomSheet } from "../../context/BottomSheetContext";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { calculateClamp } from "../../hooks/useClamp";

export default function TabLayout() {
  const { themeColors } = useTheme();
  const { location } = useUser();
  const { bottomSheet, setBottomSheet } = useBottomSheet();
  const navigation = useNavigation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const wide = width > 720;

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
            flexDirection: "row",
            backgroundColor: themeColors?.bg,
          },
        ]}
      >
        {wide && (
          <>
            <HomeHeader
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
                paddingBottom: 5,
                // backgroundColor: "red",
              }}
            />
            <WebBanner />
          </>
        )}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarPosition: "left",
          }}
          sceneContainerStyle={{
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
            lazy
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
        {bottomSheet && <BottomSheetContent />}
      </View>
    );
  }
}

const BottomSheetContent = () => {
  const { themeColors } = useTheme();
  const { bottomSheet, setBottomSheet } = useBottomSheet();
  const { width } = useWindowDimensions();
  const wide = width > 720;

  const handleSheetChanges = (index) => {
    console.log(index);

    if (index < 0) {
      setBottomSheet(null);
    }
  };

  return (
    <GestureHandlerRootView
      style={[
        generalStyles.btSheetContainer,
        { width: wide ? calculateClamp(width, 340, "42%", 620) : "100%" },
      ]}
    >
      <Pressable
        onPress={() => setBottomSheet(null)}
        style={generalStyles.overlay}
      ></Pressable>
      <BottomSheet
        enablePanDownToClose
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        index={bottomSheet ? 0 : -1}
        animateOnMount={true}
        backgroundStyle={{
          backgroundColor: themeColors.fgAlt,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: themeColors?.text,
          width: 35,
          height: 5,
        }}
        onChange={handleSheetChanges}
        snapPoints={[290, 500]}
      >
        <BottomSheetScrollView
          contentContainerStyle={[
            generalStyles.btSheetContentContainer,
            { backgroundColor: themeColors?.fgAlt },
          ]}
        >
          {bottomSheet}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
