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
} from "react-native";
import { Screen } from "../../components/Screens";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import BounceScrollView from "../../components/BounceScroll";
import { ChevronLeft, Search } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native";
import { useRef } from "react";

export default function Tab() {
  const { wide } = useTheme();
  return (
    // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //   }}
    //   behavior={Platform.OS === "ios" ? "padding" : undefined} // Adjust for iOS
    // >
    <Screen style={styles.container} headerFixed header={<SearchHeader />}>
      <View style={{ flex: 1 }}>
        {wide && <SearchHeader />}
        <SearchBox />
        <ThemeText>Tab Search</ThemeText>
      </View>
    </Screen>
    // </KeyboardAvoidingView>
  );
}

const SearchHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
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
  return (
    <Pressable
      onPress={() => {
        inputRef.current?.focus();
        console.log("kk");
      }}
    >
      <View style={styles.searchBoxContainer}>
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: wide
                ? themeColors?.textFade + 24
                : themeColors?.fg,
            },
          ]}
        >
          <AdaptiveElement styles={{ padding: 5 }}>
            <Search size={20} />
            <TextInput
              ref={inputRef}
              placeholder="Search for city"
              style={styles.textInput}
              placeholderTextColor={themeColors?.textFade}
              autoFocus
            />
          </AdaptiveElement>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
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
  searchBox: {
    height: 54,
    paddingHorizontal: 14,
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 50,
    // justifyContent: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    zIndex: 1000,
    ...(Platform.OS === "web" && {
      outlineStyle: "none", // Disables the outline on web
    }),
  },
});
