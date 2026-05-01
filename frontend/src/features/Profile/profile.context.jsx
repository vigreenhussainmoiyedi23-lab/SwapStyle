import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userAllListings, setUserAllListings] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <ProfileContext.Provider
      value={{
        userAllListings,
        setUserAllListings,
        profileUser,
        setProfileUser,
        loading,
        setLoading,
        recentSwaps,
        setRecentSwaps,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
