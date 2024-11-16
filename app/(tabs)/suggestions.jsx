import { View, Text, StyleSheet } from "react-native";
import { ThemeText, ThemeScreen } from "../../components/ThemeComponents";
import HomeHeader from "../../components/HomeHeader";

export default function Tab() {
  return (
    <ThemeScreen style={styles.container} header={<HomeHeader />}>
      <ThemeText>Tab Suggestions</ThemeText>
    </ThemeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
