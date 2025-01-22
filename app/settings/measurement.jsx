import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import ModalContent from "../../components/ModalContent";
import { useUser } from "../../context/UserContext";
import Cluster, { ClusterItem } from "../../components/Cluster";
import { Circle, PencilRuler, Ruler, Scale } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import { preferenceIcons, preferenceList } from "../../functions";

export default function Measurement() {
  const { preferences, setPreferences } = useUser();
  const { wide } = useTheme();
  const { measurement: config } = preferenceList;
  const { measurement } = preferences;
  const router = useRouter();

  const toggleMetric = (bool) => {
    setMetric(bool);
  };

  return (
    <ModalContent
      title="Measurement"
      onClose={() => router.back()}
      submitButtonText="Save Changes"
      cancelButtonText="Cancel"
      noInput
      noBtn
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: wide || 16,
          gap: 42,
          paddingVertical: 21,
        }}
      >
        {Object.entries(config).map(([key, setting]) => (
          <Cluster
            key={key}
            title={setting.label}
            titleIcon={preferenceIcons.measurement[key]}
            config={{ transform: [{ translateY: 15 }] }}
          >
            {setting.options.map((option) => (
              <ClusterItem
                key={option}
                text={option}
                icon={false}
                onPress={() => {
                  setPreferences({
                    ...preferences,
                    measurement: {
                      ...measurement,
                      [key]: option,
                    },
                  });
                }}
                radio={(option === measurement[key]).toString()}
              />
            ))}
          </Cluster>
        ))}
      </View>
    </ModalContent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
