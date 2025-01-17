import { useLocalSearchParams } from "expo-router";
import { BackHandler, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function SearchResult() {
  const params = useLocalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate("search");
          return true;
        }
      );
      return () => backHandler.remove();
    }
  }, []);
  return (
    <View>
      <Text>Result {params.q}</Text>
    </View>
  );
}
