import { Ionicons } from "@expo/vector-icons";
import useThemeColorContent from "../../components/themeColorContent";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { Image, StyleSheet } from "react-native";

export default function TabsLayout() {
  const colors = useThemeColorContent();
  const headerLogo = () => (
    <Image
      source={require("../../assets/images/logo-1.png")}
      style={styles.logo}
    />
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
          tabBarStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.text,
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: "Dashboard",
          }}
        />
        <Tabs.Screen
          name="NewCard"
          options={{
            title: "New Card",
          }}
        />
        <Tabs.Screen
          name="Setting"
          options={{
            title: "Setting",
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
