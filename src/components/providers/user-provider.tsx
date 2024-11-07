"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Config } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";

interface UserProps {
  username: string;
  firstname: string;
  lastname: string;
  initials: string;
  phoneno: number;
  profilePicUrl: string;
  role: "USER" | "MODS" | "ADMIN";
  accountStatus: "ACTIVE" | "BLACKLIST" | "BANNED";
  accountType: "FREE" | "PREMIUM";
  city: string;
  state: string;
  country: string;
  email: string;
  emailVerified: boolean;
  streetAddress: string;
  zipcode: number;
  identityVerified: boolean;
}

interface UserContextProps {
  user: UserProps | undefined | null;
  isAuthenticated: boolean;
  fetchUser: () => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isAuthenticated: false,
  fetchUser: () => {},
  signOut: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

const fetchUserFn = async () => {
  return await axios.post(`${Config.APP_URL}/api/user/getUserData`, "", {
    withCredentials: true,
  });
};

const checkAuthentication = async () => {
  return await axios.post(`${Config.APP_URL}/api/auth/authUser`, "", {
    withCredentials: true,
  });
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: fetchUserFn,
    onSuccess: async (res) => {
      const data = await res.data;

      if (data.statusCode === 200) {
        setUser(data.userData);
      } else {
        toast.error(data.statusMessage);
      }
    },
    onError: (error) => toast.error(`${error.name}: ${error.message}`),
  });

  const authMutation = useMutation({
    mutationFn: checkAuthentication,
    onSuccess: async (res) => {
      const data = await res.data;

      if (data.statusCode === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    },
    onError: (error) => toast.error(`${error.name}: ${error.message}`),
  });

  useEffect(() => {
    if (!user) {
      mutation.mutate();
      authMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = () => {
    mutation.mutate();
    authMutation.mutate();
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        isAuthenticated,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}