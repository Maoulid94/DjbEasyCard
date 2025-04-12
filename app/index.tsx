import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Loading from "@/components/shared/Loading";
import { API_URL } from "@/constants/variables";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = await SecureStore.getItemAsync("API-KEY");
        if (!apiKey) {
          throw new Error("Missing API Key!")
        }

        const response = await fetch(`${API_URL}/auth/verify?apiKey=${apiKey}`);
        if (!response.ok) {
          await SecureStore.deleteItemAsync("API-KEY")
          throw new Error("Invalid API Key!")
        }
        router.replace("/(tabs)/Dashboard");
      } catch (error) {
        router.replace("/(auth)/Login");
      }
    };

    checkApiKey();
  }, []);

  return <Loading visible={true} />;
}
