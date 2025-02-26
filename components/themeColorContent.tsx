import Colors from "@/constants/colors";
import { useColorScheme } from "react-native";

export default function useThemeColorContent() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? Colors.darkMode : Colors.lightMode;
}
// theme="light"
// --text: #121416;
//   --background: #e7f1fe;
//   --primary: #003780;
//   --secondary: #98b7e1;
//   --accent: #6098e1;

// theme="dark"
//   --text: #e9ebed;
//   --background: #010b18;
//   --primary: #80b7ff;
//   --secondary: #1e3c67;
//   --accent: #1e569f;
