import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";

export default function Tab() {
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: "red",
        },
      ]}
    >
      <ThemeText>Tab Search</ThemeText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
