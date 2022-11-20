import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || undefined);
      setUserLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <Context.Provider
      value={{
        currentUser,
        userLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
