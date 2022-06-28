import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
} from "react";
import { getUserProfile } from "../utils/Services";
import { UserProfile } from "../utils/types";

type AuthContextProps = {
  user: UserProfile;
  setUser: Dispatch<any>;
  userLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<boolean>;
};
export const AuthContext = createContext<AuthContextProps | null>(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState(true);

  const setUserProfile = async () => {
    try {
      const user_profile = await getUserProfile();
      setUser(user_profile);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("User is not logged in");
      setIsLoggedIn(false);
    }
    setUserLoading(false);
  };
  useEffect(() => {
    setUserProfile();
    // console.log({ isLoggedIn }); console.log({ userLoading });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userLoading, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
