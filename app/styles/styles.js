import { StyleSheet } from "react-native";

const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 8,
  },
  stack: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  weatherInfo: {
    fontSize: 16,
    textAlign: "center",
    color: "#666666",
  },
});

export default generalStyles;