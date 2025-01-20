import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
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
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { themeColors, wide } = useTheme();
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
  }, [navigation, wide]);

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
      style={{
        flex: 1,
        backgroundColor: themeColors?.bgFade,
      }}
      keyboardVerticalOffset={80}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors?.bgFade,
          },
        ]}
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
              style={{
                width: "100%",
                justifyContent: "center",
              }}
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
                <ArrowLeft />
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
            <View style={!wide && styles.form}>{renderInputs()}</View>
            <View style={styles.buttonContainer}>
              {renderButton("Cancel", onClose, [
                styles.cancelButton,
                {
                  backgroundColor: themeColors?.text + "cd",
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 14,
    marginBottom: 15,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
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

  cancelButton: {
    // flex: 0.1,
    // backgroundColor: "#FF3B30",
  },
  wrapper: {
    // flex: 1,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
  },
  centerCard: {
    borderWidth: 1,
    alignSelf: "center",
    maxWidth: 420,
    padding: 32,
    borderRadius: 14,
  },
  inputField: {
    gap: 8,
  },
});

export default ModalContent;
