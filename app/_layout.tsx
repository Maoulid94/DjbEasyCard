import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/components/shared/ThemeContext";

export default function RootLayout() {
  useFonts({
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-light": require("./../assets/fonts/Outfit-Light.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
  });
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/SignUp" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
