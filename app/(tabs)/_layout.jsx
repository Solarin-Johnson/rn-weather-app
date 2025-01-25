import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MyTabBar from "@/components/TabBar";
import { CloudRain, Home, Search, Sparkles, User2 } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import generalStyles from "@/styles/styles";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { useBottomSheet } from "../../context/BottomSheetContext";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { calculateClamp } from "../../hooks/useClamp";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Tabs, TabSlot, TabList, TabTrigger } from "expo-router/ui";
import { TabButton } from "../../components/TabBar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { HomeIcon } from "../../styles/icons";
import { useSearch } from "../../context/SearchContext";
import WebBanner from "../../components/Banner/webBanner";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedScreen = ({ children, style }) => {
  return (
    <Animated.View
      entering={FadeIn.duration(2000)}
      exiting={FadeOut.duration(2000)}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </Animated.View>
  );
};

export default function TabLayout() {
  const { themeColors } = useTheme();
  const { location } = useUser();
  const { bottomSheet, setBottomSheet } = useBottomSheet();
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const { width, height } = useWindowDimensions();
  const wide = width > 720;
  const { setSearchQuery } = useSearch();

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

  const TabBottomGradient = Platform.OS !== "ios" ? LinearGradient : View;
  const maskColor = wide ? themeColors?.bgFade : themeColors?.bg;

  if (location !== "denied") {
    return (
      <View
        // colors={[themeColors?.primary, themeColors?.bg]}
        style={[
          {
            flex: 1,
            flexDirection: "row",
            height: height,
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
              }}
            />
            <WebBanner />
          </>
        )}
        <Tabs
          style={{ flex: 1 }}
          screenOptions={{
            tabBarHideOnKeyboard: true,
            unmountOnBlur: true,
          }}
        >
          <TabSlot style={{ flex: 1 }} render={AnimatedScreen} />

          <TabList style={{ backgroundColor: "transparent" }} asChild>
            <MyTabBar>
              {[
                { name: "home", href: "/", icon: HomeIcon, title: "Home" },
                { name: "search", href: "/search", icon: Search },
                { name: "insights", href: "/insights", icon: CloudRain },
                { name: "me", href: "/me", icon: User2 },
              ].map((tab, index) => (
                <TabTrigger
                  key={tab.name}
                  name={tab.name}
                  href={tab.href}
                  asChild
                >
                  <TabButton
                    index={index}
                    label={tab.name === "home" ? "(tabs)" : undefined}
                    options={{
                      tabBarIcon: ({ color, fill, size }) => (
                        <tab.icon color={color} fill={fill} size={size} />
                      ),
                      ...(tab.title && { title: tab.title }),
                    }}
                  />
                </TabTrigger>
              ))}
            </MyTabBar>
          </TabList>
        </Tabs>
        {bottomSheet && <BottomSheetContent />}
      </View>
    );
  }
}

const BottomSheetContent = () => {
  const bottomSheetRef = useRef(null);
  const { themeColors } = useTheme();
  const { bottomSheet, setBottomSheet } = useBottomSheet();
  const { width } = useWindowDimensions();
  const wide = width > 720;

  const handleSheetChanges = (index) => {
    if (index < 0) {
      setBottomSheet(null);
    }
  };

  const closeSheet = () => {
    bottomSheetRef.current.close();
    setTimeout(() => {
      setBottomSheet(null);
    }, 30);
  };

  return (
    <GestureHandlerRootView
      style={[
        generalStyles.btSheetContainer,
        { width: wide ? calculateClamp(width, 340, "42%", 620) : "100%" },
      ]}
    >
      <Pressable onPress={closeSheet} style={generalStyles.overlay}></Pressable>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        // index={sheetOpen ? 0 : -1}
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
        snapPoints={[290, 530]}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
