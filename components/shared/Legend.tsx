import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

export default function LegndPieChart() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.BG_CARD }]}>
      <View style={[styles.box, { backgroundColor: colors.bg_PIE[0] }]}></View>
      <Text style={[styles.text, { color: colors.TEXT }]}>500</Text>
      <View style={[styles.box, { backgroundColor: colors.bg_PIE[1] }]}></View>
      <Text style={[styles.text, { color: colors.TEXT }]}>1000</Text>
      <View style={[styles.box, { backgroundColor: colors.bg_PIE[2] }]}></View>
      <Text style={[styles.text, { color: colors.TEXT }]}>2000</Text>
      <View style={[styles.box, { backgroundColor: colors.bg_PIE[3] }]}></View>
      <Text style={[styles.text, { color: colors.TEXT }]}>5000</Text>
      <View style={[styles.box, { backgroundColor: colors.bg_PIE[4] }]}></View>
      <Text style={[styles.text, { color: colors.TEXT }]}>10000</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  box: { height: 8, width: 8, borderRadius: 4 },
  text: { fontSize: 12, fontWeight: "bold" },
});
