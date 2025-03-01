import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import TextInputField from "@/components/shared/TextInputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const HandleLoginPage = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password are required");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
        return;
      }
      await SecureStore.setItemAsync("API-KEY", result.apiKey);
      Alert.alert("Success:", result.message);
      //redirect screem
      router.replace("/(tabs)/newCard");
      console.log();
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };
  return (
    <View>
      <Text style={styles.title}>Welcome to Dj Easy Card</Text>
      <Logo />
      <Text style={styles.subTitle}>Login to your an account</Text>
      <TextInputField label="Email" onChangeText={setEmail} value={email} />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button text="Login" onPress={HandleLoginPage} />
      <TouchableOpacity
        style={styles.lastText}
        onPress={() => router.replace("/(auth)/SignUp")}
      >
        <Text style={styles.text}>If you don't have an account?</Text>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 28, textAlign: "center", marginBottom: 20, marginTop: 25 },
  subTitle: { fontSize: 20, textAlign: "center", marginVertical: 15 },
  lastText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
});
