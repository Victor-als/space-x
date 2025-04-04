import { create } from "zustand";
import { useEffect } from "react";

interface LaunchStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setFavorites: (favorites: string[]) => void;
  isFavorite: (id: string) => boolean;
}

export const useLaunchStore = create<LaunchStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (id) => {
    const { favorites } = get();
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },

  setFavorites: (favorites) => set({ favorites }),

  isFavorite: (id) => get().favorites.includes(id),
}));

export function useSyncFavorites() {
  const setFavorites = useLaunchStore((state) => state.setFavorites);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, [setFavorites]);
}
