import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Setting() {
  const router = useRouter();

  const handleOpenLink = () => {
    const url = "https://github.com/Maoulid94";
    Linking.openURL(url);
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("API-KEY");
      router.replace("/(auth)/Login");
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subConatiner}>
        <View style={styles.cartContainer}>
          <TouchableOpacity style={styles.link}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color="black"
            />
            <Text style={styles.text}>Appearance Theme</Text>
            <TouchableOpacity style={{ position: "absolute", right: 8 }}>
              <Entypo name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <SimpleLineIcons name="settings" size={24} color="black" />
            <Text style={styles.text}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={handleLogout}>
            <SimpleLineIcons name="logout" size={24} color="black" />
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartContainer}>
          <TouchableOpacity style={styles.link}>
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={24}
              color="black"
            />
            <Text style={styles.text}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <MaterialIcons
              name="private-connectivity"
              size={24}
              color="black"
            />
            <Text style={styles.text}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.text}>Notification</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cartContainer}>
          <TouchableOpacity style={styles.link}>
            <MaterialCommunityIcons name="reload" size={24} color="black" />
            <Text style={styles.text}>Reload App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <MaterialCommunityIcons
              name="help-network-outline"
              size={24}
              color="black"
            />
            <Text style={styles.text}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={handleOpenLink}>
            <Fontisto name="info" size={24} color="black" />
            <Text style={styles.text}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  subConatiner: {
    height: "100%",
    gap: 15,
    marginTop: 18,
  },
  cartContainer: {
    height: "30%",
    backgroundColor: "#FFFFFF",
    gap: 10,
    marginHorizontal: 8,
    justifyContent: "center",
    borderRadius: 10,
  },
  link: {
    flexDirection: "row",
    gap: 15,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 10,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#FFFFFF",
    color: "#1E293B",
  },
});
//rgba(173, 216, 230, 0.5)
//rgba(173, 216, 230, 0.2)
//rgb(204, 231, 241)
// #ADD8E6
