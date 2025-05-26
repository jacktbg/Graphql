import { create } from "zustand"
import { persist } from "zustand/middleware"

type States = {
  id: string
}

type Actions = {
  setId: (id: string) => void
}

type Store = States & Actions

export const useCharacterStore = create<Store>()(
  persist(
    (set) => ({
      id: "",

      setId: (id) => set({ id: id }),
    }),
    { name: "character" }
  )
)

type Theme = "light" | "dark"

type ThemeState = {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({
          theme: get().theme === "light" ? "dark" : "light",
        }),
    }),
    { name: "theme-mode" }
  )
)
