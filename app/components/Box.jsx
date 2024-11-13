import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Box = ({ length }) => {
  const boxes = Array.from({ length }, (_, index) => (
    <View
      key={index}
      style={[styles.box, index % 2 === 0 ? styles.evenBox : styles.oddBox]}
    >
      <Text style={styles.boxText}>{index + 1}</Text>
    </View>
  ));

  return (
    <ScrollView alwaysBounceVertical contentContainerStyle={styles.container}>
      {boxes}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "blue",
  },
  box: {
    width: "33.33%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  evenBox: {
    backgroundColor: "yellow",
  },
  oddBox: {
    backgroundColor: "red",
  },
  boxText: {
    fontSize: 24,
  },
});

export default Box;
