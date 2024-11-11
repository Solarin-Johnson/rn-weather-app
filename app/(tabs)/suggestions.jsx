import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeView } from "../components/ThemeComponents";

export default function Tab() {
  return (
    <ThemeView style={styles.container}>
      <ThemeText>Tab Suggestions</ThemeText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
