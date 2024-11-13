import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, Button } from "react-native";
import { ThemeScreen } from "./components/ThemeComponents";
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
      <ThemeScreen>
        <Text>Permission Component</Text>
        <Button title="Request Location Permission" onPress={handleRedirect} />
      </ThemeScreen>
    </>
  );
};

export default Permission;
