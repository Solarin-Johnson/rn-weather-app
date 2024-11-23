import React, { createContext, useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const [bottomSheet, setBottomSheet] = useState(null);

  return (
    <BottomSheetContext.Provider value={{ bottomSheet, setBottomSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};
