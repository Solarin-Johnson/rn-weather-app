import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeScreen } from "@/components/ThemeComponents";

export default function Tab() {
  return (
    <ThemeScreen style={styles.container}>
      <ThemeText>Tab Profile</ThemeText>
    </ThemeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
