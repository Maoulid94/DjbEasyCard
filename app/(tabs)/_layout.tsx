import { router, Tabs } from "expo-router";
import { StatusBar, Image, StyleSheet } from "react-native";
import { useTheme } from "@/components/shared/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
  const { colors, theme } = useTheme();
  const headerLogo = () => (
    <Image
      source={require("../../assets/images/logo_dbj.png")}
      style={[styles.logo, { backgroundColor: colors.BG_CONTENT }]}
    />
  );

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.BG_CONTENT}
      />

      <Tabs
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          headerLeft: headerLogo,
          tabBarStyle: {
            backgroundColor: colors.BG_CONTENT,
            borderColor: colors.BG_CONTENT,
          },
          headerTitleStyle: { color: colors.TEXT },
          headerStyle: { backgroundColor: colors.BG_CONTENT },
          tabBarActiveTintColor: colors.BG_CONTENT_SECONDARY,
          tabBarInactiveTintColor: colors.TEXT,
          tabBarActiveBackgroundColor: colors.BG_TINT,
          tabBarInactiveBackgroundColor: colors.BG_CONTENT,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof FontAwesome.glyphMap;

            if (route.name === "Dashboard") {
              iconName = focused ? "dashboard" : "tachometer";
            } else if (route.name === "NewCard") {
              iconName = focused ? "plus-square" : "plus-square-o";
            } else if (route.name === "Setting") {
              iconName = focused ? "cog" : "cogs";
            } else {
              iconName = "question-circle";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: "Dashboard",
            headerTitle: "General Statistics",
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
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: 10,
  },
});
