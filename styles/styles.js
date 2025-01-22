import { Platform, StyleSheet } from "react-native";
import { clamp } from "../functions";

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
    justifyContent: "start",
  },
  stack: {
    flex: 1,
    flexdirection: "column",
    justifyContent: "start",
  },
  paddedWideScrrenTop: {
    paddingTop: 100,
  },
  paddedX: {
    paddingHorizontal: 16,
  },
  padded: {
    padding: clamp(16, "4%", 20000000),
    // padding: "4%",
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
  btSheetContainer: {
    position: "absolute",
    zIndex: 1000,
    bottom: 0,
    width: "100%",
    height: "100%",
    right: 0,
    // flex: 1,
    zIndex: 1000,
  },
  btSheetContentContainer: {
    flex: 1,
    paddingTop: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    right: 0,
    backgroundColor: "#00000070",
  },
  bottomCard: {
    // padding: 12,
    borderRadius: 28,
  },
  title: {
    fontSize: 18,
    opacity: 0.85,
  },
  buttonPressed: {
    opacity: Platform.OS === "web" ? 0.7 : 1,
  },
});

export default generalStyles;
