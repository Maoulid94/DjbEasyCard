import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useTheme } from "./ThemeContext";

interface DataTypes {
  onPressCancel: () => void;
  onPressSubmit: () => void;
}

export default function SubmitButton({
  onPressCancel,
  onPressSubmit,
}: DataTypes) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.BG_CARD }]}>
      <TouchableOpacity
        style={[styles.box, { marginLeft: 6, backgroundColor: colors.BG_TINT }]}
        onPress={onPressCancel}
      >
        <Text style={[styles.text, { color: colors.TEXT }]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.box, { backgroundColor: colors.BG_TINT }]}
        onPress={onPressSubmit}
      >
        <Text style={[styles.text, { color: colors.TEXT }]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  box: {
    width: "38%",
    fontSize: 18,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    fontFamily: "bold",
  },
  text: { fontSize: 18, textAlign: "center", fontFamily: "bold" },
});
