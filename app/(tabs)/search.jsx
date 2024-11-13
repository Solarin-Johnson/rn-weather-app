import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeScreen } from "../components/ThemeComponents";

export default function Tab() {
  return (
    <ThemeScreen
      style={[
        styles.container,
        {
          backgroundColor: "red",
        },
      ]}
    >
      <ThemeText>Tab Search</ThemeText>
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
