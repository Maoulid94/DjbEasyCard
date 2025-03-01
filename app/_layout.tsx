import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-light": require("./../assets/fonts/Outfit-Light.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="singUp" /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
