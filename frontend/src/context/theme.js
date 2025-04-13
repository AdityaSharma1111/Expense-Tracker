import { createContext, useContext } from "react";

// Creating a ThemeContext with default values
export const ThemeContext = createContext({
    themeMode: "light", // Default theme mode is "light"
    darkTheme: () => {}, // Placeholder function to switch to dark mode
    lightTheme: () => {}, // Placeholder function to switch to light mode
});

// Exporting ThemeProvider to be used as a wrapper for components that need theme access
export const ThemeProvider = ThemeContext.Provider;

// Custom hook to use ThemeContext values easily in any component
export default function useTheme() {
    return useContext(ThemeContext);
}