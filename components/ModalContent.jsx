import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import { router, useNavigation } from "expo-router";
import generalStyles from "../styles/styles";
import { ArrowLeft, Trash2 } from "lucide-react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const ModalContent = ({
  title,
  onSubmit,
  onClose,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  initialFormData = {},
  noInput = false,
  children,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { theme, themeColors, wide } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !wide,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: themeColors?.bgFade,
        borderBottomColor: themeColors?.text + "25",
      },
      title: title,
    });
  }, [navigation, wide, title, themeColors]);

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(initialFormData);
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderInputs = () =>
    Object.entries(initialFormData).map(([key, value], index) => (
      <View key={index} style={styles.inputField}>
        <ThemeText
          styles={{
            fontSize: 18,
            textTransform: "capitalize",
          }}
        >
          {key}
        </ThemeText>
        <AdaptiveElement>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors?.text + "40",
              },
            ]}
            placeholderTextColor={themeColors?.text + "80"}
            placeholder={`Enter ${key}`}
            value={formData[key]}
            onChangeText={(text) => handleInputChange(key, text)}
            autoFocus={index === 0}
          />
        </AdaptiveElement>
      </View>
    ));

  const renderButton = (
    label,
    onPress,
    additionalStyle = {},
    textStyle = {}
  ) => (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: themeColors?.primary,
        },
        additionalStyle,
        pressed && generalStyles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={{
        flex: 1,
      }}
      style={{
        flex: 1,
        backgroundColor: themeColors?.bgFade,
      }}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={{
          minHeight: 200,
        }}
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: themeColors?.bgFade,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.wrapper,
            wide && styles.centerCard,
            {
              borderColor: wide ? themeColors?.text + "25" : "",
              flex: !wide && 1,
            },
          ]}
        >
          {wide && (
            <View
              style={[
                styles.header,
                {
                  width: "100%",
                  justifyContent: "center",
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  router.back();
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  zIndex: 1,
                }}
              >
                <ArrowLeft color={themeColors?.text} />
              </Pressable>
              <ThemeText styles={{ fontSize: 21, textAlign: "center" }}>
                {title}
              </ThemeText>
            </View>
          )}
          <View
            style={[
              styles.content,
              {
                flex: !wide && 1,
              },
            ]}
          >
            {!noInput && (
              <View style={!wide && styles.form}>{renderInputs()}</View>
            )}
            {children && <View style={{ flex: 1 }}>{children}</View>}
          </View>
          <View
            style={[
              styles.buttonContainer,
              {
                borderColor: wide ? "transparent" : themeColors?.text + "20",
                padding: wide ? 0 : 20,
              },
            ]}
          >
            {renderButton("Cancel", onClose, [
              styles.cancelButton,
              {
                backgroundColor:
                  themeColors?.text + (theme === "light" ? "15" : "de"),
              },
            ])}
            {renderButton(
              submitButtonText,
              handleSubmit,
              {},
              {
                color: themeColors?.bg,
              }
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 10,
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    borderTopWidth: 1,
    width: "100%",
  },
  button: {
    height: 48,
    minWidth: 50,
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16.5,
    fontWeight: "500",
  },
  header: {
    marginBottom: 24,
  },
  cancelButton: {
    // flex: 0.1,
    // backgroundColor: "#FF3B30",
  },
  wrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  centerCard: {
    borderWidth: 1,
    alignSelf: "center",
    maxWidth: 420,
    padding: 30,
    borderRadius: 14,
  },
  inputField: {
    gap: 9,
  },
});

export default ModalContent;
