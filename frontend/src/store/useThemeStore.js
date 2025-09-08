import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("VDOStream-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("VDOStream-theme",theme);
    set({theme})
  },
}))