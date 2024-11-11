import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeView } from "../components/ThemeComponents";
import generalStyles from "../styles/styles";
import HomeHeader from "../components/HomeHeader";

export default function Tab() {
  return (
    <ThemeView style={[styles.container]}>
      <HomeHeader />
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
