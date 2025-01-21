import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import {
  AppState,
  Platform,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { getData, storeData } from "../functions";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeChange from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState("auto");
  const [themeColors, setThemeColors] = useState(false);
  const width = useWindowDimensions().width;
  const [wide, setWide] = useState(width > 720);

  useEffect(() => {
    setWide(width > 720);
  }, [width]);

  useLayoutEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await getData("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme("auto");
      }
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    if (theme === "auto") {
      setTheme(colorScheme === "dark" ? "dark" : "light");
    }
    storeData("theme", theme);

    setThemeColors(colors[theme]);
  }, [colorScheme, theme]);

  useThemeChange((colorScheme) => {
    setTheme(colorScheme);
  });

  const themeInv = theme === "dark" ? "light" : "dark";

  if (Platform.OS === "web") {
    const style = document.createElement("style");
    style.innerHTML = `:root { color-scheme: ${theme}; }`;
    document.head.appendChild(style);
  }

  const [isLandscape, setIsLandscape] = useState(null);

  useEffect(() => {
    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setIsLandscape(
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
      );
    };
    checkOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        setIsLandscape(
          event.orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        );
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [AppState.currentState]);

  if (!themeColors) return null;

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeColors, wide, isLandscape }}
    >
      <StatusBar
        style={themeInv}
        // hidden={isLandscape}
        hideTransitionAnimation="slide"
        animated={true}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider };
