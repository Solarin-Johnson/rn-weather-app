import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, location }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = useContext(UserContext);

export { UserContext, UserProvider };
