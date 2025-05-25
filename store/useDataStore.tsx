import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/interfaces/UserInterface";

export interface ApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

interface DataStore {
  users: User[] | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;

  CACHE_DURATION: number;

  fetchData: (forceRefresh?: boolean) => Promise<void>;
  refetch: () => Promise<void>;
  updateUser: (userId: number, updates: Partial<User>) => void;
  toggleBookmark: (userId: number) => void;
  addUser: (user: Omit<User, "id">) => void;
  removeUser: (userId: number) => void;
  getBookmarkedUsers: () => User[];
  clearCache: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUsers: (users: User[]) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      users: null,
      loading: true,
      error: null,
      lastFetchTime: null,

      CACHE_DURATION: 24 * 60 * 60 * 1000,

      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setUsers: (users: User[]) => set({ users }),

      fetchData: async (forceRefresh = false) => {
        const { users, lastFetchTime, CACHE_DURATION } = get();

        if (
          !forceRefresh &&
          lastFetchTime &&
          users &&
          Date.now() - lastFetchTime < CACHE_DURATION
        ) {
          set({ loading: false });
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetch("https://dummyjson.com/users?limit=20");

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const result: ApiResponse = await res.json();

          const processedUsers = result.users.map((user) => ({
            ...user,
            rating: 1 + Math.floor(Math.random() * 5),
            isBookmarked: false,
          }));

          set({
            users: processedUsers,
            lastFetchTime: Date.now(),
            loading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch data";
          console.error("Failed to fetch:", error);
          set({ error: errorMessage, loading: false });
        }
      },

      refetch: async () => {
        const { fetchData } = get();
        await fetchData(true);
      },

      updateUser: (userId: number, updates: Partial<User>) => {
        const { users } = get();
        if (!users) return;

        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, ...updates } : user
        );

        set({ users: updatedUsers });
      },

      toggleBookmark: (userId: number) => {
        const { users } = get();
        if (!users) return;

        const updatedUsers = users.map((user) =>
          user.id === userId
            ? { ...user, isBookmarked: !user.isBookmarked }
            : user
        );

        set({ users: updatedUsers });
      },

      addUser: (newUser: Omit<User, "id">) => {
        const { users } = get();
        if (!users) return;

        const maxId = Math.max(...users.map((u) => u.id), 0);
        const userWithId: User = {
          ...newUser,
          id: maxId + 1,
        };

        set({ users: [...users, userWithId] });
      },

      removeUser: (userId: number) => {
        const { users } = get();
        if (!users) return;

        const filteredUsers = users.filter((user) => user.id !== userId);
        set({ users: filteredUsers });
      },

      getBookmarkedUsers: (): User[] => {
        const { users } = get();
        if (!users) return [];
        return users.filter((user) => user.isBookmarked);
      },

      clearCache: () => {
        set({
          users: null,
          lastFetchTime: null,
          error: null,
        });
      },
    }),
    {
      name: "user-data-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        users: state.users,
        lastFetchTime: state.lastFetchTime,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false;
        }
      },
    }
  )
);

const initializeStore = () => {
  const state = useDataStore.getState();

  if (
    !state.users ||
    (state.lastFetchTime &&
      Date.now() - state.lastFetchTime > state.CACHE_DURATION)
  ) {
    state.fetchData();
  } else {
    state.setLoading(false);
  }
};

if (typeof window !== "undefined") {
  setTimeout(initializeStore, 100);
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      const { lastFetchTime, CACHE_DURATION, fetchData } =
        useDataStore.getState();
      if (lastFetchTime && Date.now() - lastFetchTime > CACHE_DURATION) {
        fetchData();
      }
    }
  });
}
