import { createContext, useContext, useEffect, useState } from "react";
import { getData, getLocation, removeData, storeData } from "../functions";
import * as Location from "expo-location";
// import { getLocation } from "../api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    metric: true,
    sound: true,
  });
  const [location, setLocation] = useState(null);

  const fetchLocation = async () => {
    // console.log("Fetching location");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setLocation("denied");
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Reverse geocode to get address

      const { city, country } = await getLocation(location.coords);
      // console.log(city, country);

      const locationWithAddress = {
        ...location.coords,
        name: city,
        country,
      };
      setLocation(locationWithAddress);
      await storeData("location", JSON.stringify(locationWithAddress));
    } catch (error) {
      console.error("Error getting location or address:", error);
    }
  };

  // console.log(location);

  useEffect(() => {
    const loadLocation = async () => {
      const storedLocation = await getData("location");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      } else {
        fetchLocation();
      }
    };

    loadLocation();
  }, []);

  // removeData("location");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        location,
        fetchLocation,
        preferences,
        setPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export { UserContext, UserProvider };
