import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { useColorScheme } from "react-native";
import { getData, storeData } from "../functions";
import { colors } from "../colors";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState("auto");
  const [themeColors, setThemeColors] = useState({});

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {theme ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider };
