import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import TextInputField from "../../components/shared/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";
import { useRouter } from "expo-router";
import Logo from "@/components/shared/Logo";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const HandleCreateAccount = async () => {
    if (!email || !name || !password || !passwordConfirm) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        Alert.alert("Sign Up Failed", result.message);
        return;
      }
      Alert.alert("Message", result.message);
      console.log("API was create : ", result);
      router.replace("/(auth)/Login");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Create New Account</Text>
      <Logo />
      <TextInputField label="Name" onChangeText={setName} value={name} />
      <TextInputField label="Email" onChangeText={setEmail} value={email} />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInputField
        label="Confirm Password"
        password={true}
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
      />
      <Button text="Create Account" onPress={HandleCreateAccount} />
      <View style={styles.logincontent}>
        <Text style={styles.text}>Already have an account?</Text>
        <Pressable onPress={() => router.replace("/(auth)/Login")}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, textAlign: "center", marginVertical: 10 },
  logincontent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
});
