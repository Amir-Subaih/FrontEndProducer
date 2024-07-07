import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  let [userId, setUserId] = useState(null);
  let [loading, setLoading] = useState(true);

  const getUserData = async () => {
    if (userToken) {
      try {
        const { data } = await axios.get(`https://backendproduce.onrender.com/api/users/${userId}`, {
          headers: { token: userToken },
        });
        // Set the user data after fetching it
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false); // Stop loading on error
      }
    } else {
      setLoading(false); // Stop loading if there is no token
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserData(); // Fetch user data when the token changes
    }
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        loading,
        setLoading,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
