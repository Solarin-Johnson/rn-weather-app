import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  getData,
  getLocation,
  preferenceList,
  removeData,
  storeData,
} from "../functions";
import * as Location from "expo-location";
import { Asset } from "expo-asset";

// import { getLocation } from "../api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "User",
  });
  const [preferences, setPreferences] = useState({
    measurement: {
      temperatureUnit: "Celsius",
      windSpeedUnit: "km/h",
      timeFormat: "24-hour",
      precipitationUnit: "mm",
    },
    display: {
      airQualityIndex: "Hide",
      uvIndexDisplay: "All",
    },
    notifications: ["weatherAlerts"],
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

      console.log(location);

      // Reverse geocode to get address

      getLocation(location.coords)
        .then(({ city, country }) => {
          const locationWithAddress = {
            ...location.coords,
            name: city,
            country,
          };
          setLocation(locationWithAddress);
          return locationWithAddress;
        })
        .then((locationWithAddress) => {
          storeData("location", JSON.stringify(locationWithAddress));
        })
        .catch((error) => {
          console.error("Error in getLocation:", error);
        });
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

  useLayoutEffect(() => {
    const loadUser = async () => {
      const storedUser = await getData("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
    preloadAssets();
  }, []);

  useLayoutEffect(() => {
    const loadPreferences = async () => {
      const storedPreferences = await getData("preferences");
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      storeData("preferences", JSON.stringify(preferences));
      console.log("Preferences stored");
    }
    return () => {
      isSubscribed = false;
    };
  }, [preferences]);

  useEffect(() => {
    storeData("user", JSON.stringify(user));
  }, [user]);

  const icons = {
    clear: Asset.fromModule(require("../assets/iconPacks/clear.png")),
    cloudy: Asset.fromModule(require("../assets/iconPacks/cloudy.png")),
    foggy: Asset.fromModule(require("../assets/iconPacks/foggy.png")),
    lightPrecipitation: Asset.fromModule(
      require("../assets/iconPacks/lightPrecipitation.png")
    ),
    heavyPrecipitation: Asset.fromModule(
      require("../assets/iconPacks/heavyPrecipitation.png")
    ),
    freezing: Asset.fromModule(require("../assets/iconPacks/freezing.png")),
    thunderstorms: Asset.fromModule(
      require("../assets/iconPacks/thunderstorms.png")
    ),
    icePellets: Asset.fromModule(require("../assets/iconPacks/icePellets.png")),
  };

  const preloadAssets = () =>
    Promise.all(Object.values(icons).map((asset) => asset.downloadAsync()));

  // removeData("user");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        location,
        fetchLocation,
        preferences,
        measurement: preferences.measurement,
        display: preferences.display,
        setPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export { UserContext, UserProvider };
