import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { BgCloud } from "../styles/icons";

const CloudBg = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
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
    top: 0,
    left: 0,
    zIndex: 100,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});

export default CloudBg;
