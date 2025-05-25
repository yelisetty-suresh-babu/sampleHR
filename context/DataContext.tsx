"use client";
import { User } from "@/interfaces/UserInterface";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import React from "react";

type DataContextType = {
  users: User[] | null;
  loading: boolean;
  refetch: () => void;
};

type DataProviderProps = {
  children: ReactNode;
};
export interface ApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/users?limit=20");
      const result: ApiResponse = await res.json();
      setUsers(
        result.users.map((user) => {
          return {
            ...user,
            rating: 1 + Math.floor(Math.random() * 5),
            isBookmarked: false,
          };
        })
      );
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ users, loading, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
