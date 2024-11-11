import { useEffect, useState } from "react";
import { Appearance } from "react-native";

const useThemeChange = (callback) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
      if (callback) {
        callback(colorScheme);
      }
    });

    return () => subscription.remove();
  }, [callback]);

  return colorScheme;
};

export default useThemeChange;
