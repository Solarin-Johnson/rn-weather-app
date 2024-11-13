import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeView } from "../components/ThemeComponents";

export default function Tab() {
  return (
    <ThemeView
      style={[
        styles.container,
        {
          backgroundColor: "red",
        },
      ]}
    >
      <ThemeText>Tab Search</ThemeText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
