import { useLocalSearchParams } from "expo-router";
import { BackHandler, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ThemeText } from "./ThemeComponents";
import { useWeather } from "../context/WeatherContext";
import { KeyboardController } from "react-native-keyboard-controller";
import { useSearch } from "../context/SearchContext";

export default function SearchResult() {
  const { q } = useLocalSearchParams();
  const { setSearchQuery, addRecentSearch } = useSearch();
  const navigation = useNavigation();

  useEffect(() => {
    KeyboardController.dismiss();
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate("search");
          setSearchQuery("");
          return true;
        }
      );
      return () => backHandler.remove();
    }
  }, []);
  return (
    <View>
      <ThemeText>Result {q}</ThemeText>
    </View>
  );
}
