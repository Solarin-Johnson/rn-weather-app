import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";
import HomeHeader from "../../components/HomeHeader";

export default function Tab() {
  return (
    <Screen style={styles.container} header={<HomeHeader />}>
      <ThemeText>Tab Suggestions</ThemeText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
