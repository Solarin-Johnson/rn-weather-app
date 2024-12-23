import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <Screen style={[styles.container]} headerFixed header={<SearchHeader />}>
      {wide && <SearchHeader />}
      <SearchBox />
      <ThemeText>Tab Search</ThemeText>
    </Screen>
  );
}

const SearchHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
            
          />
        </AdaptiveElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 21,
  },
  searchBoxContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  searchBox: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 2.5,
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
