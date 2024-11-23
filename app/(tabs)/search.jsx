import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screens";
import { ThemeText } from "../../components/ThemeComponents";
import BounceScrollView from "../../components/BounceScroll";

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
      <BounceScrollView>
        <View style={{ height: 1000 }}>
          <ThemeText>Content</ThemeText>
        </View>
      </BounceScrollView>
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
