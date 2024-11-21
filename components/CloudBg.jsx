import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { BgCloud } from "../styles/icons";

const CloudBg = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "98%",
          maxWidth: 640,
        }}
      >
        <BgCloud />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // opacity: 0.7,
    top: 10,
    left: 0,
    flex: 1,
    width: "100%",
    aspectRatio: 4 / 2.5,
    // height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});

export default CloudBg;
