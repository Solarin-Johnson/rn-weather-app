import { View, Text, StyleSheet, Platform } from "react-native";
import { Screen } from "../../components/Screens";
import { AdaptiveElement, ThemeText } from "../../components/ThemeComponents";
import generalStyles from "../../styles/styles";
import { useTheme } from "../../context/ThemeContext";
import Cluster, { ClusterChild, ClusterItem } from "../../components/Cluster";
import {
  Bell,
  Info,
  MapPin,
  Paintbrush,
  PenLine,
  Thermometer,
} from "lucide-react-native";
import { useUser } from "../../context/UserContext";
import Svg, { Circle } from "react-native-svg";
import { useNavigation, useRouter } from "expo-router";
import WeatherIcon from "../../components/WeatherIcon";
import { useWeather } from "../../context/WeatherContext";

export default function Tab() {
  const { wide } = useTheme();
  const { location } = useUser();
  const navigation = useNavigation();
  const router = useRouter();

  const handleClusterPress = (route) => {
    router.push(`/settings/${route}`);
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
            onPress={() => handleClusterPress("location")}
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
          <ThemeText>{current?.temp_c}°</ThemeText>
        </View> */}
        <ThemeText styles={{ fontSize: 21, flex: 1 }}>User</ThemeText>

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
