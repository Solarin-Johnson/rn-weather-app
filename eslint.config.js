import { defineConfig } from "eslint-define-config";
import reactPlugin from "eslint-plugin-react";
import reactNativePlugin from "eslint-plugin-react-native";

export default defineConfig({
  rules: {
    "no-undef": "error", // This will highlight undefined variables as errors
    "no-unused-vars": "warn", // This will highlight unused variables as warnings
    "no-console": "warn", // This will highlight console.log, console.error, etc. as warnings
    "react/react-in-jsx-scope": "error",
    "react-native/no-unused-styles": "warn", // For React Native specific rules
  },
  plugins: {
    react: reactPlugin,
    "react-native": reactNativePlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true, // Enable JSX support
      },
    },
  },
});
