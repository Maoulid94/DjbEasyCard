import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ToastAndroid,
  Alert,
  StatusBar,
} from "react-native";
import TextInputField from "../../components/shared/TextInputField";
import Button from "@/components/shared/LoginButton";
import LoginAndSignUpText from "../../components/shared/LoginAndSignUpText";
import { useState } from "react";
import { useRouter } from "expo-router";
import Logo from "@/components/shared/Logo";
import Constants from "expo-constants";
import { useTheme } from "@/components/shared/ThemeContext";
import { API_URL } from "@/constants/variables";

export default function SignUpPage() {
  const { colors, theme } = useTheme();
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
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.BG_CONTENT}
      />
      <View style={[styles.container, { backgroundColor: colors.BG_CONTENT }]}>
        <Text style={[styles.title, { color: colors.TEXT }]}>
          Create New Account
        </Text>
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
        <LoginAndSignUpText
          text="Already have an account?"
          onPress={() => {
            router.replace("/(auth)/Login");
          }}
          link="Login"
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, textAlign: "center", marginVertical: 10 },
});
