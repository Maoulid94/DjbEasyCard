import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

type DataTypes = {
  text: string;
  value: number;
};

export default function StatisticsBox({ text, value }: DataTypes) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.BG_CARD }]}>
      <Text style={[styles.value, { color: colors.TEXT }]}>{value}</Text>
      <Text style={[styles.text, { color: colors.TEXT_GRAY }]}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
    width: "40%",
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
