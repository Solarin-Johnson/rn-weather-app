import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { AdaptiveElement, ThemeText } from "./ThemeComponents";
import { router } from "expo-router";
import generalStyles from "../styles/styles";
import { ArrowLeft } from "lucide-react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const ModalContent = memo(
  ({
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
    const { themeColors, wide } = useTheme();
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const handleSubmit = useCallback(() => {
      onSubmit(formData);
      setFormData(initialFormData);
    }, [formData, onSubmit, initialFormData]);

    const handleInputChange = useCallback((key, value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const renderInputs = useCallback(
      () =>
        Object.entries(initialFormData).map(([key, value], index) => {
          const inputRef = useRef(null);

          useEffect(() => {
            if (index === 0 && inputRef.current) {
              setTimeout(() => inputRef.current.focus(), 0);
            }
          }, [index]);

          return (
            <View key={key} style={styles.inputField}>
              <ThemeText style={styles.label}>{key}</ThemeText>
              <AdaptiveElement>
                <TextInput
                  ref={inputRef}
                  style={[
                    styles.input,
                    { borderColor: `${themeColors.text}40` },
                  ]}
                  placeholderTextColor={`${themeColors.text}80`}
                  placeholder={`Enter ${key}`}
                  value={formData[key]}
                  onChangeText={(text) => handleInputChange(key, text)}
                />
              </AdaptiveElement>
            </View>
          );
        }),
      [initialFormData, formData, handleInputChange, themeColors]
    );

    const renderButton = useCallback(
      (label, onPress, additionalStyle = {}, textStyle = {}) => (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: themeColors.primary,
              height: wide ? 48 : 45,
            },
            additionalStyle,
            pressed && generalStyles.buttonPressed,
          ]}
          onPress={onPress}
        >
          <ThemeText inv style={[styles.buttonText, textStyle]}>
            {label}
          </ThemeText>
        </Pressable>
      ),
      [themeColors]
    );

    const isWeb = Platform.OS === "web";
    const ModalContainer = isWeb ? Animated.View : KeyboardAvoidingView;
    const Wrapper = ScrollView;

    const animatedProps = {
      entering:
        isWeb && wide
          ? FadeInDown
          : isWeb
            ? SlideInDown.duration(250)
            : SlideInDown.duration(350),
    };

    const wrapperProps = isWeb
      ? { style: styles.content, keyboardShouldPersistTaps: "handled" }
      : { style: styles.content };

    const Overlay = () => (
      <TouchableWithoutFeedback onPress={router.back}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
    );

    return (
      <ModalContainer
        entering={FadeIn.duration(50)}
        behavior={isWeb ? undefined : "padding"}
        style={[
          styles.modalContainer,
          {
            paddingTop: insets.top + 4,
            backgroundColor: wide ? `${themeColors.bg}99` : `#00000060`,
            justifyContent: wide ? "center" : "flex-end",
          },
        ]}
      >
        <Overlay />
        <Animated.View
          style={[
            styles.wrapper,
            wide ? styles.centerCard : styles.sheetCard,
            {
              borderColor: wide ? `${themeColors.text}20` : "transparent",
              backgroundColor: wide ? themeColors.bgFade : themeColors.fg,
              maxHeight: height - (isWeb && wide ? 100 : 0),
            },
          ]}
          {...animatedProps}
        >
          <View style={styles.header}>
            <Pressable onPress={router.back} style={styles.backButton(wide)}>
              <ArrowLeft color={themeColors.text} />
            </Pressable>
            <ThemeText style={styles.title}>{title}</ThemeText>
          </View>

          <Wrapper {...wrapperProps}>
            {!noInput && (
              <View style={!wide && styles.form}>{renderInputs()}</View>
            )}
            {children}
          </Wrapper>

          {!noBtn && (
            <View
              style={[
                styles.buttonContainer,
                {
                  padding: wide ? 0 : 20,
                  borderTopWidth: wide ? 0 : 1,
                  marginTop: wide ? 6 : 12,
                  borderColor: `${themeColors.text}20`,
                },
              ]}
            >
              {renderButton(
                "Cancel",
                onClose,
                {
                  backgroundColor: themeColors?.textFade + "90",
                },
                { color: "#ffffff" }
              )}
              {renderButton(submitButtonText, handleSubmit)}
            </View>
          )}
        </Animated.View>
      </ModalContainer>
    );
  }
);

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    backdropFilter: "blur(24px)",
  },
  container: {
    alignContent: "center",
  },
  input: {
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 17,
  },
  label: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
  },
  button: {
    minWidth: 50,
    justifyContent: "center",
    borderRadius: 7,
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    margin: 10,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  backButton: (wide) => ({
    position: "absolute",
    left: wide ? 0 : 16,
    zIndex: 1,
  }),
  title: {
    fontSize: 21,
    textAlign: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    elevation: 2,
    shadowColor: "#00000060",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
  },
  content: {
    width: "100%",
  },
  form: {
    paddingHorizontal: 20,
    height: "100%",
  },
  centerCard: {
    borderWidth: 1,
    alignSelf: "center",
    maxWidth: 480,
    margin: 54,
    padding: 30,
    borderRadius: 14,
    elevation: 10,
    shadowColor: "#00000050",
  },
  sheetCard: {
    paddingTop: 16,
  },
  inputField: {
    gap: 9,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ModalContent;
