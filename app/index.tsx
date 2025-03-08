import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View, ActivityIndicator, Text } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = await SecureStore.getItemAsync("API-KEY");

        if (apiKey) {
          router.replace("/(tabs)/Dashboard");
        } else {
          router.replace("/(auth)/Login");
        }
      } catch (error) {
        router.replace("/(auth)/Login");
      }
    };

    checkApiKey();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
