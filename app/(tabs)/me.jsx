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
  PenLine,
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

export default function Tab() {
  const { wide } = useTheme();
  const { location } = useUser();
  const navigation = useNavigation();
  const router = useRouter();

  const handleClusterPress = (route) => {
    router.push(`/settings/${route}`);
  };

  const openLocationSettings = () => {
    Platform.OS === "ios"
      ? Linking.openURL("app-settings:")
      : Platform.OS !== "web" &&
        startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS, {
          data: `package:${packageName}`,
        });
  };
  return (
    <Screen style={styles.container} title={"Profile"}>
      <View
        style={[
          generalStyles.screen,
          {
            justifyContent: wide ? "center" : "flex-start",
            gap: 24,
          },
        ]}
      >
        <Cluster>
          <UserCluster onPress={() => handleClusterPress("change-name")} />
        </Cluster>
        <Cluster>
          <ClusterItem
            text={location.name}
            icon={MapPin}
            onPress={openLocationSettings}
          />
          <ClusterItem text={"Units"} icon={Thermometer} />
          <ClusterItem
            text={"Notifications"}
            icon={Bell}
            iconProps={{ size: 21 }}
          />
        </Cluster>
        <Cluster>
          <ClusterItem
            text={"About App"}
            icon={Info}
            iconProps={{ size: 21 }}
          />
          <ClusterItem text={"Clear data"} icon={Paintbrush} />
        </Cluster>
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
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
});
