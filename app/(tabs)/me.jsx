import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeModules,
  Linking,
} from "react-native";
import { AdaptiveElement, ThemeText } from "@/components/ThemeComponents";
import generalStyles from "@/styles/styles";
import { useTheme } from "@/context/ThemeContext";
import Cluster, { ClusterChild, ClusterItem } from "@/components/Cluster";
import {
  Bell,
  Info,
  MapPin,
  Paintbrush,
  PencilRuler,
  PenLine,
  RefreshCcw,
  Sun,
  Thermometer,
} from "lucide-react-native";
import { useUser } from "@/context/UserContext";
import Svg, { Circle } from "react-native-svg";
import { useNavigation, useRouter } from "expo-router";
import WeatherIcon from "@/components/WeatherIcon";
import { useWeather } from "@/context/WeatherContext";
import { Screen } from "@/components/Screens";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import { packageName } from "../../functions";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

export default function Tab() {
  const { wide } = useTheme();
  const { location, fetchLocation } = useUser();
  const router = useRouter();
  const [refreshingLocation, setRefreshingLocation] = useState(false);

  const handleClusterPress = (route) => {
    router.push(`/settings/${route}`);
  };

  const refreshLocation = async () => {
    setRefreshingLocation(true);
    await fetchLocation();
    setRefreshingLocation(false);
  };
  const clusterItems = [
    [
      {
        component: UserCluster,
        props: { onPress: () => handleClusterPress("name") },
      },
    ],
    [
      {
        text: location.name,
        icon: MapPin,
        iconRight: RefreshCcw,
        onPress: refreshLocation,
        loading: refreshingLocation,
        rotate: true,
      },
      {
        text: "Measurement",
        icon: PencilRuler,
        onPress: () => handleClusterPress("measurement"),
        iconProps: { size: 19.5 },
      },
      {
        text: "Display",
        icon: Sun,
        onPress: () => handleClusterPress("display"),
      },
      {
        text: "Notifications",
        icon: Bell,
        iconProps: { size: 21 },
      },
    ],
    [
      {
        text: "About App",
        icon: Info,
        iconProps: { size: 21 },
      },
      {
        text: "Clear data",
        icon: Paintbrush,
      },
    ],
  ];

  return (
    <Screen title={"Profile"} alwaysShowHeader refresh={false}>
      <View
        style={[
          generalStyles.screen,
          {
            justifyContent: wide ? "center" : "flex-start",
            gap: 18,
          },
        ]}
      >
        {clusterItems.map((cluster, index) => (
          <Cluster key={index} index={index}>
            {cluster.map((item, i) =>
              item.component ? (
                <item.component key={i} {...item.props} />
              ) : (
                <ClusterItem key={i} {...item} />
              )
            )}
          </Cluster>
        ))}
      </View>
    </Screen>
  );
}

const UserCluster = ({ onPress }) => {
  const { themeColors } = useTheme();
  const { user } = useUser();
  const { currentWeather: current } = useWeather();
  return (
    <ClusterChild onPress={onPress}>
      <View style={styles.user}>
        {/* <View
          style={{
            width: 48,
            aspectRatio: 1,
            borderRadius: 50,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </View> */}
        <View style={{ flex: 1, gap: 2 }}>
          <ThemeText styles={{ fontSize: 21, flex: 1 }}>{user.name}</ThemeText>
          <ThemeText
            styles={{
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            Change Nickname
          </ThemeText>
        </View>

        <AdaptiveElement
          styles={{
            opacity: 0.85,
          }}
        >
          <PenLine size={20} />
        </AdaptiveElement>
      </View>
    </ClusterChild>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
});
