"use client";

import { User } from "@/types/user.type";
import { clientToken } from "@/utils/http";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type AppContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const initAppContext: AppContextType = {
  user: null,
  setUser: () => {},
};

const AppContext = createContext<AppContextType>(initAppContext);

export interface AppProviderProps {
  children: React.ReactNode;
  initAccessToken: string;
  user: User | null;
}

const AppProvider = ({ children, initAccessToken, user: UserProp = null }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(UserProp);
  useState(() => {
    if (typeof window !== "undefined") {
      clientToken.setAccessToken(initAccessToken || "");
    }
  });
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
