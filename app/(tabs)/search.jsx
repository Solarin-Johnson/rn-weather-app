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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../../components/Screens";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import BounceScrollView from "../../components/BounceScroll";
import {
  ArrowUpRight,
  ChevronLeft,
  History,
  Search,
  X,
} from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { TextInput } from "react-native";
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { calculateClamp } from "../../hooks/useClamp";
import { useWeather } from "../../context/WeatherContext";
import WeatherDetails from "../../components/Weather/Details";
import PopularCities from "../../components/PopularCities";
import SearchResult from "../../components/SearchResult";
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  LinearTransition,
  runOnJS,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import generalStyles from "../../styles/styles";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { searchAutoComplete } from "../../api";
import { useSearch } from "../../context/SearchContext";

export default function Tab() {
  const { wide } = useTheme();
  const { width, height } = useWindowDimensions();
  const { futureWeather, currentWeather, currentWeatherLoc } = useWeather();
  const { q } = useLocalSearchParams();
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    q && setSearchQuery(q);
  }, [q]);

  // useFocusEffect(
  //   useCallback(() => {
  //     setSearchQuery("");
  //   }, [setSearchQuery])
  // );

  return (
    <Screen
      style={styles.container}
      fixed={Platform.OS !== "web"}
      header={<SearchHeader />}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {wide && (
          <View
            style={{
              marginTop: Platform.OS !== "web" ? 60 : 0,
            }}
          >
            <SearchHeader />
          </View>
        )}
        {q ? (
          <SearchResult />
        ) : (
          <View
            style={{
              flex: 1,
              gap: 16,
              paddingTop: wide ? 0 : 8,
            }}
          >
            <Suggestions />
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
  const { setSearchQuery } = useSearch();

  return (
    <View
      style={[
        styles.header,
        {
          paddingBottom: Platform.OS === "web" && wide ? 20 : 0,
        },
      ]}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            q ? navigation.navigate("search") : navigation.goBack();
            setSearchQuery("");
          }}
          style={{
            position: "absolute",
            left: wide ? 0 : 16,
            zIndex: 10,
          }}
        >
          <AdaptiveElement>
            <ChevronLeft size={24} strokeWidth={2.4} />
          </AdaptiveElement>
        </TouchableOpacity>
        <ThemeText
          styles={[
            styles.headerText,
            {
              textAlign: "center",
            },
          ]}
        >
          Search for city
        </ThemeText>
      </View>
      <SearchBox />
    </View>
  );
};

const SearchBox = () => {
  const { themeColors, wide } = useTheme();
  const { width } = useWindowDimensions();
  const inputRef = useRef(null);
  const { q } = useLocalSearchParams();
  const { searchQuery: query, setSearchQuery: setQuery } = useSearch();
  const [textFocus, setTextFocus] = useState(false);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [keyboardHide, setKeyboardHide] = useState(true);

  const navigation = useNavigation();
  const router = useRouter();
  const pathname = router.pathname;

  const handleFocus = () => {
    setTextFocus(true);
    opacity.value = 1;

    pathname !== "/search" && navigation.navigate("search");
  };

  const handleBlur = () => {
    setTextFocus(false);
    opacity.value = 0;
  };

  Platform.OS !== "web" &&
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
    if (keyboardHide) {
      if (inputRef.current.isFocused()) inputRef.current.blur();
    }
  }, [keyboardHide, inputRef]);

  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: wide ? 0 : 16,
        // maxWidth: 450,
      }}
    >
      <Pressable
        onPress={() => {
          inputRef.current?.focus();
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
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </AdaptiveElement>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const Suggestions = () => {
  const { themeColors, wide } = useTheme();
  const { q } = useLocalSearchParams();
  const {
    searchQuery: query,
    setSearchQuery: setQuery,
    recentSearches,
  } = useSearch();

  const navigation = useNavigation();

  const config = {
    ...{ query, setQuery },
  };

  if (query || recentSearches.length > 0)
    return (
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          // maxWidth: 450,
        }}
      >
        <View>
          {!query ? (
            <RecentSearches {...config} />
          ) : (
            <AutoComplete {...config} />
          )}
        </View>
      </View>
    );
};

const RecentSearches = ({ query, setQuery, ...props }) => {
  const { recentSearches, removeRecentSearch } = useSearch();
  const navigation = useNavigation();

  const handleSearchSubmit = ({ name, lat, lng }) => {
    navigation.navigate("search", { q: name, cord: lat + "," + lng });
  };

  if (recentSearches.length > 0)
    return (
      <View style={styles.recentSearches} {...props}>
        <ThemeText
          styles={[
            generalStyles.title,
            {
              fontSize: 15,
            },
          ]}
        >
          Recent
        </ThemeText>
        <View>
          {recentSearches.map((search, i) => {
            const handlePress = () =>
              handleSearchSubmit({
                lat: search.lat,
                lng: search.lng,
                name: search.name,
              });
            return (
              <QuickSearch
                key={i}
                {...search}
                labelIcon={History}
                onPress={handlePress}
                onBtnPress={() => removeRecentSearch(i)}
              />
            );
          })}
        </View>
      </View>
    );
};

const AutoComplete = ({ ...props }) => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchQuery: q, setSearchQuery: setQ, addRecentSearch } = useSearch();
  const [loading, setLoading] = useState(true);
  const { themeColors } = useTheme();
  const navigation = useNavigation();

  const handleSearchSubmit = ({ name, lat, lng, sub }) => {
    navigation.navigate("search", { q: name, cord: lat + "," + lng });
    addRecentSearch({ name, lat, lng, sub });
  };

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        setLoading(true);
        const response = await searchAutoComplete(q);
        setSearchResults(
          response.map((item) => ({
            name: item.name,
            sub: item.country,
            lat: item.lat,
            lng: item.lon,
          }))
        );
        setLoading(false);
      };

      fetchResults();
    }
  }, [q]);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 6,
          height: 72,
        }}
      >
        <ActivityIndicator size={"small"} color={themeColors?.primary} />
        <ThemeText
          styles={[
            generalStyles.title,
            {
              fontSize: 15,
              fontWeight: "400",
            },
          ]}
        >
          Searching...
        </ThemeText>
      </View>
    );

  if (searchResults.length > 0)
    return (
      <View style={styles.recentSearches} {...props}>
        <View>
          {searchResults.map((search, i) => {
            const handlePress = () =>
              handleSearchSubmit({
                lat: search.lat,
                lng: search.lng,
                name: search.name,
                sub: search.sub,
              });

            const handleBtnPress = (e) => {
              e.stopPropagation();
              setQ(search.name);
            };

            return (
              <QuickSearch
                key={i}
                {...search}
                icon={ArrowUpRight}
                onPress={handlePress}
                onBtnPress={handleBtnPress}
              />
            );
          })}
        </View>
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 6,
          height: 72,
        }}
      >
        <ThemeText
          styles={[
            generalStyles.title,
            {
              fontSize: 15,
              fontWeight: "400",
            },
          ]}
        >
          No results
        </ThemeText>
      </View>
    );
};

const QuickSearch = ({
  labelIcon: LabelIcon = Search,
  icon: Icon = X,
  name,
  sub,
  onPress,
  onBtnPress,
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
        height: 72,
        borderBottomWidth: 1,
        borderBottomColor: themeColors?.textFade + "30",
      }}
      onPress={onPress}
      android_ripple={{
        color: themeColors?.textFade + "20",
      }}
    >
      <View
        style={{
          backgroundColor: themeColors?.textFade + "25",
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
          flex: 1,
          alignItems: "flex-start",
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
          styles={{
            fontSize: 13,
            fontWeight: "400",
            opacity: 0.6,
          }}
        >
          {sub}
        </ThemeText>
      </View>
      <Pressable
        style={{
          padding: 16,
          height: "100%",
          // backgroundColor: themeColors?.textFade + "25",
          justifyContent: "center",
        }}
        onPress={onBtnPress}
      >
        <AdaptiveElement>
          <Icon size={16} strokeWidth={3} />
        </AdaptiveElement>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    paddingTop: Platform.OS === "web" ? 20 : 15,
    opacity: 0.9,
    gap: 14,
    // maxWidth: 450,
    width: "100%",
    alignSelf: "center",
  },
  headerText: {
    fontSize: 21,
  },
  searchBoxContainer: {
    width: "100%",
    // paddingHorizontal: 14,
    marginBottom: 6,
  },
  searchBoxContent: {
    width: "100%",
    // maxWidth: 450,
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
    marginBottom: 12,
    // gap: 6,
    // overflow: "hidden",

    // paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    // height: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 0,
    zIndex: 1000,
    ...(Platform.OS === "web" && {
      outlineStyle: "none", // Disables the outline on web
    }),
  },
});
