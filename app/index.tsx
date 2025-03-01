import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useRef } from "react";
import ImageAnimation from "../components/imageAnimation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* <ImageAnimation /> */}
      <View>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/dashboard")}>
          <Text>Login........</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/(auth)/SignUp")}>
          <Text>Sign up here........</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
});
