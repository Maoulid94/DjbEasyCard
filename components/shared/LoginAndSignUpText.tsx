import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "./ThemeContext";

interface DataTypes {
  text: string;
  link: string;
  onPress: () => void;
}

export default function LoginAndSignUpText({ text, link, onPress }: DataTypes) {
   const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.TEXT }]}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, { color: colors.link }]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
});
