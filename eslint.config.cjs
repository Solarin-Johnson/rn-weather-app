export default {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "react-native", "jsx-a11y", "import"],
  rules: {
    "no-unused-vars": "warn", // Warns about unused variables
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react-native/no-inline-styles": "off", // Example of disabling a React Native specific rule
    // Add custom rules here
  },
};
