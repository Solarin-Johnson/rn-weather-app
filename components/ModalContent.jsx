import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import { router, useNavigation } from "expo-router";
import generalStyles from "../styles/styles";
import { ArrowLeft, Trash2 } from "lucide-react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ImageBackground } from "expo-image";
import { getBrightness } from "../functions";
import ImageBg from "./ImageBg";

const ModalContent = ({
  title,
  onSubmit,
  onClose,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  initialFormData = {},
  noInput,
  noBtn,
  children,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { theme, themeColors, wide } = useTheme();
  const navigation = useNavigation();

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

  const ModalContainer = Platform.OS !== "web" ? KeyboardAvoidingView : View;

  return (
    <ImageBg>
      <ModalContainer
        behavior="padding"
        contentContainerStyle={{
          flex: 1,
        }}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            {
              minHeight: "100%",
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.wrapper,
              wide && styles.centerCard,
              {
                borderColor: wide ? themeColors?.text + "20" : "",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: wide ? 3 : 0 },
                shadowOpacity: wide ? 0.2 : 0,
                shadowRadius: wide ? 10 : 0,
                flex: !wide && 1,
                backgroundColor: wide
                  ? themeColors?.bgFade + "90"
                  : themeColors?.bg,
                backdropFilter: wide ? "blur(20px)" : "none",
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
                  paddingHorizontal: !wide,
                },
              ]}
            >
              {!noInput && (
                <View style={!wide && styles.form}>{renderInputs()}</View>
              )}
              {children}
            </View>
            {!noBtn && (
              <View
                style={[
                  styles.buttonContainer,
                  {
                    borderColor: wide
                      ? "transparent"
                      : themeColors?.text + "20",
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
            )}
          </View>
        </ScrollView>
      </ModalContainer>
    </ImageBg>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    borderTopWidth: 1,
    width: "100%",
    marginTop: 16,
  },
  button: {
    height: 46,
    minWidth: 50,
    justifyContent: "center",
    borderRadius: 7,
    flex: 1,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    marginBottom: 24,
  },
  cancelButton: {},
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
    gap: 16,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  centerCard: {
    borderWidth: 1,
    alignSelf: "center",
    maxWidth: 480,
    margin: 54,
    padding: 30,
    borderRadius: 14,
  },
  inputField: {
    gap: 9,
  },
});

export default ModalContent;
