import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

export default function LoginPage() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/card-image.gif")}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/dashboard")}>
          <Text>Login........</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/signUp")}>
          <Text>Sign up here........</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: width * 0.8, // Set width to 80% of the screen width
    height: undefined, // Let height adjust automatically
    aspectRatio: 1,
  }, // Adjust aspect ratio based on the image's natural dimensions},
});
