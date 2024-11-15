import { useEffect, useState } from "react";
import { getValueInPx } from "../functions";
import { Dimensions } from "react-native";

const calculateClamp = (min, preferred, max) => {
  const { width } = Dimensions.get("window");

  const minValue = getValueInPx(min, width);
  const maxValue = getValueInPx(max, width);
  const preferredValue = getValueInPx(preferred, width);

  // Return the clamped value (within min and max range)
  return Math.max(minValue, Math.min(preferredValue, maxValue));
};

const useClamp = (min, preferred, max) => {
  const [clampedValue, setClampedValue] = useState(() =>
    calculateClamp(min, preferred, max)
  );

  // Function to calculate the clamped value

  useEffect(() => {
    const onResize = () => {
      setClampedValue(calculateClamp(min, preferred, max)); // Recalculate on screen resize
    };

    // Add event listener for screen resize
    const subscription = Dimensions.addEventListener("change", onResize);

    // Cleanup event listener when the component unmounts
    return () => {
      subscription?.remove();
    };
  }, [min, preferred, max]);

  return clampedValue;
};

export default useClamp;
