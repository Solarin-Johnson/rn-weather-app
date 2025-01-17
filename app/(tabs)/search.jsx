import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  useWindowDimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Screen } from "../../components/Screens";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import BounceScrollView from "../../components/BounceScroll";
import { ChevronLeft, History, Search, X } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { TextInput } from "react-native";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { calculateClamp } from "../../hooks/useClamp";
import { useWeather } from "../../context/WeatherContext";
import WeatherDetails from "../../components/Weather/Details";
import PopularCities from "../../components/PopularCities";
import SearchResult from "../../components/SearchResult";
import Animated, {
  FadeInDown,
  FadeInUp,
  runOnJS,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import generalStyles from "../../styles/styles";
import { useKeyboardHandler } from "react-native-keyboard-controller";

export default function Tab() {
  const { wide } = useTheme();
  const { height } = useWindowDimensions();
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();
  const { q } = useLocalSearchParams();

  return (
    <Screen
      style={styles.container}
      fixed={Platform.OS !== "web"}
      header={<SearchHeader />}
    >
      <View style={{ flex: 1 }}>
        {wide && (
          <View
            style={{
              marginTop: Platform.OS !== "web" ? 60 : 0,
            }}
          >
            <SearchHeader />
          </View>
        )}
        <SearchBox />
        {q ? (
          <SearchResult />
        ) : (
          <View>
            <PopularCities />
          </View>
        )}
        {/* <ThemeText>Tab Search</ThemeText> */}
      </View>
    </Screen>
  );
}

const SearchHeader = () => {
  const navigation = useNavigation();
  const { wide } = useTheme();
  const { q } = useLocalSearchParams();

  return (
    <View
      style={[
        styles.header,
        {
          paddingBottom: Platform.OS === "web" && wide ? 20 : 0,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          q ? navigation.navigate("search") : navigation.goBack();
        }}
        style={{
          position: "absolute",
          left: 10,
        }}
      >
        <AdaptiveElement>
          <ChevronLeft size={24} strokeWidth={2.4} />
        </AdaptiveElement>
      </TouchableOpacity>
      <ThemeText styles={styles.headerText}>Search for city</ThemeText>
    </View>
  );
};

const SearchBox = () => {
  const { themeColors, wide } = useTheme();
  const inputRef = useRef(null);
  const { q } = useLocalSearchParams();
  const [query, setQuery] = useState(q);
  const [textFocus, setTextFocus] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [keyboardHide, setKeyboardHide] = useState(true);

  const navigation = useNavigation();

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    // Navigate to the search results page with the query as a parameter
    navigation.navigate("search", { q: query });
  };

  useLayoutEffect(() => {
    q ? setQuery(q) : setQuery("");
  }, [q]);

  const handleFocus = () => {
    setTextFocus(true);
    height.value = contentHeight;
    setTimeout(() => {
      opacity.value = 1;
    }, 200);
  };

  const handleBlur = () => {
    setTextFocus(false);
    height.value = 0;
    opacity.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 400 }),
    opacity: withTiming(opacity.value, { duration: 100 }),
  }));

  useKeyboardHandler(
    {
      onEnd: (e) => {
        "worklet";
        runOnJS(setKeyboardHide)(e.progress === 0);
      },
    },
    []
  );

  useEffect(() => {
    console.log(keyboardHide);

    if (keyboardHide) {
      if (inputRef.current?.isFocused()) inputRef.current?.blur();
    }
  }, [keyboardHide, inputRef]);

  return (
    <View>
      <Pressable
        onPress={() => {
          inputRef.current?.focus();
          console.log("kk");
        }}
        style={styles.searchBoxContainer}
      >
        <Animated.View
          style={[
            styles.searchBoxContent,
            {
              backgroundColor: wide
                ? themeColors?.textFade + 24
                : themeColors?.fg,
            },
          ]}
        >
          <View style={styles.searchBox}>
            <AdaptiveElement styles={{ padding: 5 }}>
              <Search size={20} />
              <TextInput
                ref={inputRef}
                placeholder="Search for city"
                style={styles.textInput}
                value={query}
                onChangeText={setQuery}
                placeholderTextColor={themeColors?.textFade}
                // autoFocus
                returnKeyType="search"
                onSubmitEditing={handleSearchSubmit}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </AdaptiveElement>
          </View>
        </Animated.View>
      </Pressable>
      <Animated.View
        key={textFocus}
        style={[
          animatedStyle,
          {
            // flex: 1,
          },
        ]}
      >
        {!query ? (
          <RecentSearches
            onLayout={(event) => {
              const measuredHeight = event.nativeEvent.layout.height;
              setContentHeight(Number(measuredHeight) + 64);
            }}
          />
        ) : (
          <AutoComplete
            onLayout={(event) => {
              const measuredHeight = event.nativeEvent.layout.height;
              setContentHeight(Number(measuredHeight) + 64);
            }}
            q={query}
          />
        )}
      </Animated.View>
    </View>
  );
};

const RecentSearches = ({ ...props }) => {
  const { recentSearches } = useWeather();
  if (recentSearches.length > 0)
    return (
      <View style={styles.recentSearches} {...props}>
        <ThemeText
          styles={[
            generalStyles.title,
            {
              fontSize: 15,
              fontWeight: "600",
            },
          ]}
        >
          Recent
        </ThemeText>
        <View>
          {recentSearches.map((search, i) => (
            <QuickSearch key={i} {...search} labelIcon={History} />
          ))}
        </View>
      </View>
    );
};

const AutoComplete = ({ q, ...props }) => {
  const { recentSearches } = useWeather();
  if (recentSearches.length > 0)
    return (
      <View style={styles.recentSearches} {...props}>
        <View>
          {recentSearches.map((search, i) => (
            <QuickSearch key={i} {...search} labelIcon={History} />
          ))}
        </View>
      </View>
    );
};

const QuickSearch = ({
  labelIcon: LabelIcon = Search,
  icon: Icon = X,
  name,
  sub,
}) => {
  const { themeColors } = useTheme();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 4,
        gap: 10,
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: themeColors?.textFade + "50",
      }}
    >
      <View
        style={{
          backgroundColor: themeColors?.textFade + 30,
          padding: 7,
          borderRadius: "50%",
        }}
      >
        <AdaptiveElement>
          <LabelIcon size={16} />
        </AdaptiveElement>
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <ThemeText
          styles={{
            fontSize: 17,
            fontWeight: "400",
          }}
        >
          {name}
        </ThemeText>
        <ThemeText
          styles={[
            generalStyles.title,
            {
              fontSize: 13,
              fontWeight: "400",
            },
          ]}
        >
          {sub}
        </ThemeText>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <AdaptiveElement>
          <Icon size={16} strokeWidth={3} />
        </AdaptiveElement>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    paddingTop: Platform.OS === "web" ? 20 : 0,
    opacity: 0.9,

    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
  },
  headerText: {
    fontSize: 21,
  },
  searchBoxContainer: {
    width: "100%",
    paddingHorizontal: 14,
    marginTop: 10,
  },
  searchBoxContent: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    borderRadius: 50,
  },
  searchBox: {
    paddingHorizontal: 14,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  recentSearches: {
    flex: 1,
    // gap: 6,
    // overflow: "hidden",
    padding: 16,
  },
  textInput: {
    flex: 1,
    // height: "100%",
    height: 54,
    fontSize: 16,
    borderWidth: 0,
    zIndex: 1000,
    ...(Platform.OS === "web" && {
      outlineStyle: "none", // Disables the outline on web
    }),
  },
});
