import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeScreen } from "@/components/ThemeComponents";

export default function Tab() {
  return (
    <ThemeScreen style={styles.container}>
      <ThemeText>Tab Suggestions</ThemeText>
    </ThemeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
