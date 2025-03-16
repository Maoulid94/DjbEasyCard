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
import { useRouter } from "expo-router";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/components/shared/ThemeContext";

export default function Setting() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme, colors, changeTheme } = useTheme();
  const themeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  const handleOpenLink = () => {
    const url = "https://github.com/Maoulid94/DjbEasyCard";
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
    <View style={[styles.container, { backgroundColor: colors.BG_CONTENT }]}>
      <View style={styles.subConatiner}>
        <View
          style={[styles.cartContainer, { backgroundColor: colors.BG_CARD }]}
        >
          <View style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={colors.TEXT}
            />
            <Text style={[styles.text, { color: colors.TEXT }]}>
              Appearance Theme
            </Text>

            <DropDownPicker
              open={open}
              value={theme ?? null}
              items={themeOptions}
              setOpen={setOpen}
              setValue={(callback) => {
                const newTheme = callback(theme);
                changeTheme(newTheme);
              }}
              placeholder="Select Theme"
              containerStyle={{ flex: 1, backgroundColor: colors.BG_CONTENT }}
              style={{
                backgroundColor: colors.BG_CONTENT,
                borderColor: colors.BG_CARD,
              }}
              dropDownContainerStyle={{
                backgroundColor: colors.BG_CONTENT_SECONDARY,
                borderColor: colors.TEXT_GRAY,
              }}
              textStyle={{ color: colors.TEXT }}
              placeholderStyle={{ color: colors.TEXT_GRAY }}
            />
          </View>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <SimpleLineIcons name="settings" size={24} color={colors.TEXT} />
            <Text style={[styles.text, { color: colors.TEXT }]}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <Feather name="database" size={24} color={colors.TEXT} />
            <Text style={[styles.text, { color: colors.TEXT }]}>Storage</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.cartContainer, { backgroundColor: colors.BG_CARD }]}
        >
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={24}
              color={colors.TEXT}
            />
            <Text style={[styles.text, { color: colors.TEXT }]}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <MaterialIcons
              name="private-connectivity"
              size={24}
              color={colors.TEXT}
            />
            <Text style={[styles.text, { color: colors.TEXT }]}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.TEXT}
            />
            <Text style={[styles.text, { color: colors.TEXT }]}>
              Notification
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.cartContainer, { backgroundColor: colors.BG_CARD }]}
        >
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
            onPress={handleLogout}
          >
            <SimpleLineIcons name="logout" size={24} color={colors.TEXT} />
            <Text style={[styles.text, { color: colors.TEXT }]}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
          >
            <MaterialCommunityIcons
              name="help-network-outline"
              size={24}
              color={colors.TEXT}
            />
            <Text style={[styles.text, { color: colors.TEXT }]}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.link, { backgroundColor: colors.BG_CONTENT }]}
            onPress={handleOpenLink}
          >
            <Fontisto name="info" size={24} color={colors.TEXT} />
            <Text style={[styles.text, { color: colors.TEXT }]}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subConatiner: {
    flex: 1,
    gap: 12,
    marginVertical: 12,
  },
  cartContainer: {
    flex: 1,
    gap: 2,
    marginHorizontal: 8,
    padding: 8,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "skyblue",
  },
  link: {
    flexDirection: "row",
    flex: 1,
    gap: 15,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "skyblue",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
