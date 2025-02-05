import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AUTHENTICATE_USER } from "../graphql/user/mutation";
import graphQLClient from "../graphql/client";

const AuthContext = createContext();
const USER_STORAGE_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    // console.log("storedUser", storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(prev => parsedUser); // Set user state from localStorage
    }
  }, []); // Run this effect once when the component mounts

  useEffect(() => {
    // console.log("UseEffect 2", user)
    if (!user) {
      // localStorage.removeItem(USER_STORAGE_KEY);
      // localStorage.removeItem("authToken");
    } else {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem("authToken", user.authToken);
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    if (user?.userInfo) {
      setLoading(false);
      return true;
    } else if (email && password) {
      const { data } = await graphQLClient.mutateData({
        mutateQuery: AUTHENTICATE_USER,
        variables: { loginInfo: { username: email, password } },
      });

      setUser((prev) => ({ ...prev, ...data?.loginUser }));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  function signUp(email, name, password) {
    setLoading(true);
    // Your sign-up logic here
  }

  const logout = () => {
    // Your logout logic here
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const isTokenExpired = (token) => {
    if (!token) return false;
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  };

  const isLoggedIn = () => {
    const isExpired = isTokenExpired(user?.authToken);
    if (isExpired) {
      console.log("here");
      // logout();
      return false;
    }
    return true;
    
  };

  const fetchToken = () => {
    if (!user.authToken) this.logout();
    return user.authToken;
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
      isLoggedIn,
      fetchToken,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {typeof children === "function" ? children(memoedValue) : children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
