import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, Button } from "react-native";
import { ThemeScreen, ThemeView } from "./components/ThemeComponents";
import { useUser } from "./context/UserContext";
import { Redirect, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestBackgroundPermissionsAsync } from "expo-location";

const Permission = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { fetchLocation, location } = useUser();

  useEffect(() => {
    if (location && location !== "denied") {
      router.replace("/(tabs)");
    }
  }, [location]);

  useLayoutEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, 0);
  }, []);

  const handleRedirect = async () => {
    if (location === "denied") {
      const result = await requestBackgroundPermissionsAsync("location");
      if (result === "granted") {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
      }
      return;
    }
    fetchLocation();
  };

  return (
    <>
      <ThemeView>
        <Text>Permission Component</Text>
        <Button title="Request Location Permission" onPress={handleRedirect} />
      </ThemeView>
    </>
  );
};

export default Permission;
