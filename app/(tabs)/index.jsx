import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeText, ThemeScreen } from "../../components/ThemeComponents";
import generalStyles from "../../styles/styles";
import HomeHeader from "../../components/HomeHeader";
import Modal from "../../components/Modal";
import { useState } from "react";
import { router, useFocusEffect, usePathname } from "expo-router";
import { useUser } from "../../context/UserContext";
import Box from "../../components/Box";
import HomeComponent from "../../components/Dom/home";
import IAmHere from "../../components/Dom/home";

export default function Tab() {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();
  const { location } = useUser();

  return (
    <ThemeScreen styles={styles.container} header={<HomeHeader />}>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ThemeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
});
