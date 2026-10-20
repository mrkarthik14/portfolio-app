"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";

type ThemeMode = "light" | "dark";
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
});
export const useThemeMode = () => useContext(ThemeContext);
let sessionMode: ThemeMode = "dark";
function readMode(): ThemeMode {
  try {
    const saved = localStorage.getItem("theme-mode");
    return saved === "light" || saved === "dark" ? saved : sessionMode;
  } catch {
    return sessionMode;
  }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("portfolio-theme", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("portfolio-theme", listener);
  };
}
function serverMode(): ThemeMode {
  return "dark";
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useSyncExternalStore(subscribe, readMode, serverMode);
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );
  const toggleTheme = () => {
    sessionMode = mode === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme-mode", sessionMode);
    } catch {
      /* Retain the choice for this session. */
    }
    window.dispatchEvent(new Event("portfolio-theme"));
  };
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
