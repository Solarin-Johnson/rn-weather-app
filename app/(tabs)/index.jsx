import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeText, ThemeScreen } from "../components/ThemeComponents";
import generalStyles from "../styles/styles";
import HomeHeader from "../components/HomeHeader";
import Modal from "../components/Modal";
import { useState } from "react";
import { router, useFocusEffect, usePathname } from "expo-router";
import { useUser } from "../context/UserContext";
import Box from "../components/Box";

export default function Tab() {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();
  const { location } = useUser();

  return (
    <ThemeScreen style={[styles.container]}>
      <HomeHeader />
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {/* <Box length={200} /> */}
    </ThemeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
