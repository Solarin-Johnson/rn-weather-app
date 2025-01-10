import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Screen } from "../../components/Screens";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import BounceScrollView from "../../components/BounceScroll";
import { ChevronLeft, Search } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native";

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
          Keyboard.dismiss();
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
  return (
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
            placeholder="Search for city"
            style={styles.textInput}
            placeholderTextColor={themeColors?.textFade}
            autoFocus
          />
        </AdaptiveElement>
      </View>
    </View>
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
  },
  headerText: {
    fontSize: 21,
  },
  searchBoxContainer: {
    width: "100%",
    paddingHorizontal: 14,
    marginTop: 5,
  },
  searchBox: {
    height: 52,
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
    outline: "none",
  },
});
