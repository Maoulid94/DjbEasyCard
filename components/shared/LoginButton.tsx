import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";
interface ButtonType {
  text: string;
  onPress: () => void;
  loading?: boolean;
}

export default function Button({ text, onPress, loading = false }: ButtonType) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: colors.BG_TINT }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors.TEXT }]}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  text: { fontSize: 18, textAlign: "center", fontFamily: "bold" },
});
