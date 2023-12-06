"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCookie } from "cookies-next";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getCookie("@cvlb_customers:token") || "");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
