import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, storeData } from "../functions";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const savedSearches = await getData("recentSearches");
        console.log("savedSearches", savedSearches);

        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    };
    loadSearchHistory();
  }, []);

  useEffect(() => {
    const saveSearchHistory = async () => {
      try {
        await storeData("recentSearches", JSON.stringify(recentSearches));
      } catch (error) {
        console.error("Error saving search history:", error);
      }
    };
    saveSearchHistory();
  }, [recentSearches]);

  const removeRecentSearch = (index) => {
    const newRecentSearches = [...recentSearches];
    newRecentSearches.splice(index, 1);
    setRecentSearches(newRecentSearches);
  };

  const addRecentSearch = (search) => {
    setRecentSearches((prev) =>
      [
        search,
        ...prev.filter(
          (item) => item.lng !== search.lng || item.lat !== search.lat
        ),
      ].slice(0, 5)
    );
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // clearRecentSearches();

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
