import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import {
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
import WebBanner from "../../components/webBanner";
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

  // useLayoutEffect(() => {
  //   setSearchQuery("");
  // }, [pathname]);

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

  const TabBtnStyle = {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  };

  if (location !== "denied") {
    return (
      <View
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
                // backgroundColor: "red",
              }}
            />
            <WebBanner />
          </>
        )}
        <Tabs
          style={{ flex: 1, backgroundColor: themeColors?.bg }}
          screenOptions={{
            tabBarHideOnKeyboard: true,
            unmountOnBlur: true,
          }}
        >
          <TabSlot
            style={{ flex: 1, backgroundColor: themeColors?.bg }}
            render={(props) => <AnimatedScreen {...props} />}
          />

          <TabList style={{ backgroundColor: "transparent" }} asChild>
            <MyTabBar>
              {/* Home Tab */}
              <TabTrigger name="home" href="/" style={TabBtnStyle} asChild>
                <TabButton
                  index={0}
                  label="(tabs)"
                  options={{
                    tabBarIcon: ({ color, fill, size }) => (
                      <HomeIcon color={color} fill={fill} size={size} />
                    ),
                    title: "Home",
                  }}
                />
              </TabTrigger>

              {/* Search Tab */}
              <TabTrigger
                name="search"
                href="/search"
                style={TabBtnStyle}
                asChild
              >
                <TabButton
                  index={1}
                  options={{
                    tabBarIcon: ({ color, fill, size }) => (
                      <Search color={color} fill={fill} size={size} />
                    ),
                  }}
                />
              </TabTrigger>

              {/* Insights Tab */}
              <TabTrigger
                name="insights"
                href="/insights"
                style={TabBtnStyle}
                asChild
              >
                <TabButton
                  index={2}
                  options={{
                    tabBarIcon: ({ color, fill, size }) => (
                      <CloudRain color={color} fill={fill} size={size} />
                    ),
                  }}
                />
              </TabTrigger>

              {/* Profile Tab */}
              <TabTrigger name="me" href="/me" style={TabBtnStyle} asChild>
                <TabButton
                  index={3}
                  options={{
                    tabBarIcon: ({ color, fill, size }) => (
                      <User2 color={color} fill={fill} size={size} />
                    ),
                  }}
                />
              </TabTrigger>
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
