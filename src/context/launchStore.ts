import { create } from "zustand";
import { useEffect } from "react";

interface LaunchStore {
  favorites: string[];
  editedDetails: Record<string, string>;
  toggleFavorite: (id: string) => void;
  setFavorites: (favorites: string[]) => void;
  isFavorite: (id: string) => boolean;
  editDetails: (id: string, newDetails: string) => void;
  getEditedDetails: (id: string) => string | null;
  setEditedDetailsFromStorage: (data: Record<string, string>) => void;
}

export const useLaunchStore = create<LaunchStore>((set, get) => ({
  favorites: [],
  editedDetails: {},

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

  editDetails: (id, newDetails) => {
    const updatedDetails = {
      ...get().editedDetails,
      [id]: newDetails,
    };
    localStorage.setItem("editedDetails", JSON.stringify(updatedDetails));
    set({ editedDetails: updatedDetails });
  },

  getEditedDetails: (id) => get().editedDetails[id] || null,

  setEditedDetailsFromStorage: (data) => {
    set({ editedDetails: data });
  },
}));

export function useSyncFavorites() {
  const setFavorites = useLaunchStore((state) => state.setFavorites);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, [setFavorites]);
}

export function useSyncEditedDetails() {
  const setEditedDetailsFromStorage = useLaunchStore(
    (state) => state.setEditedDetailsFromStorage
  );

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem("editedDetails") || "{}");
    setEditedDetailsFromStorage(storedDetails);
  }, [setEditedDetailsFromStorage]);
}