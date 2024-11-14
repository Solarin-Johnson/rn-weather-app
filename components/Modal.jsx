import { StyleSheet, Text, View, Modal as RNModal, Button } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";

const Modal = ({ modalVisible, setModalVisible }) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      // backdropColor="blue"
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView
        style={styles.centeredView}
        intensity={50}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello, I am a modal!</Text>
          <Button
            title="Hide Modal"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </BlurView>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
