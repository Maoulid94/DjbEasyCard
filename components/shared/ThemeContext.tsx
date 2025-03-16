import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/colors";

// Define the theme type
type Theme = "light" | "dark";

// Define the context type
interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.lightMode | typeof Colors.darkMode;
  changeTheme: (newTheme: Theme) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the ThemeProvider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Load the saved theme from AsyncStorage when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Function to change the theme and save it to AsyncStorage
  const changeTheme = async (newTheme: Theme) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  // Get the colors based on the current theme
  const colors = theme === "dark" ? Colors.darkMode : Colors.lightMode;

  // Provide the theme, colors, and changeTheme function to all children
  return (
    <ThemeContext.Provider value={{ theme, colors, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
