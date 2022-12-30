import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState(null);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || undefined);
    });
    if (currentUser) {
      try {
        const getUserProfileData = async () => {
          const getData = await getDoc(doc(db, "users", currentUser.uid));
          setUserProfileData(getData.exists() ? getData.data() : undefined);
        };
        getUserProfileData();
      } catch (error) {
        console.log(error);
      }
    }
    setUserLoading(false);
    return unsubscribe;
  }, [currentUser]);

  return (
    <Context.Provider
      value={{
        currentUser,
        userLoading,
        userProfileData,
        setOpenCategoryMenu,
        openCategoryMenu
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
