import { View, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import ModalContent from "../components/ModalContent";
import { useUser } from "../context/UserContext";
import Cluster, { ClusterItem } from "../components/Cluster";
import { useTheme } from "../context/ThemeContext";
import { preferenceIcons, preferenceList } from "../functions";

export default function SettingsLayout({ settingType }) {
  const { preferences, setPreferences } = useUser();
  const { theme, themeColors, wide } = useTheme();
  const config = preferenceList[settingType];
  const currentPreferences = preferences[settingType];
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  return (
    <ModalContent
      title={settingType.charAt(0).toUpperCase() + settingType.slice(1)}
      onClose={() => router.back()}
      submitButtonText="Save Changes"
      cancelButtonText="Cancel"
      noInput
      noBtn
    >
      <View
        style={{
          //   flex: 1,
          paddingHorizontal: wide || 16,
          gap: 48,
          paddingVertical: isWeb && 21,
        }}
      >
        {Object.entries(config).map(([key, setting]) => (
          <Cluster
            key={key}
            title={setting.label}
            titleIcon={preferenceIcons[settingType][key]}
            backgroundColor={
              isWeb
                ? themeColors?.bg + (theme === "light" ? "70" : "70")
                : wide
                  ? themeColors?.bg + "af"
                  : themeColors?.bg + (theme === "light" ? "cd" : "80")
            }
            index={key}
            animateParent
          >
            {setting.options.map((option) => (
              <ClusterItem
                key={option}
                text={option}
                icon={false}
                onPress={() => {
                  setPreferences({
                    ...preferences,
                    [settingType]: {
                      ...currentPreferences,
                      [key]: option,
                    },
                  });
                }}
                radio={(option === currentPreferences[key]).toString()}
              />
            ))}
          </Cluster>
        ))}
      </View>
    </ModalContent>
  );
}
