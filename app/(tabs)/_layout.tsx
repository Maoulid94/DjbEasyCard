import useThemeColorContent from "../../components/themeColorContent";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TabsLayout() {
  const colors = useThemeColorContent();
  const headerLogo = () => (
    <Image
      source={require("../../assets/images/logo-1.png")}
      style={styles.logo}
    />
  );
  const headerIcon = () => (
    <TouchableOpacity>
      <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
    </TouchableOpacity>
  );
  return (
    <>
      <StatusBar
        barStyle={
          colors.background === "#010b18" ? "light-content" : "dark-content"
        }
        backgroundColor={colors.background}
      />

      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          headerLeft: headerLogo,
          headerRight: headerIcon,
          tabBarStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.text,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
          }}
        />
        <Tabs.Screen
          name="newCard"
          options={{
            title: "New Card",
          }}
        />
        <Tabs.Screen
          name="allCardsData"
          options={{
            title: "Data",
          }}
        />
      </Tabs>
    </>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
    backgroundColor: "#1e3c67",
    marginLeft: 10,
  },
});
