import { Text, View, StyleSheet } from "react-native";

interface DataTypes {
  text: string;
  value: number;
}

export default function StatisticsBox({ text, value }: DataTypes) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  text: {
    fontSize: 16,
  },
  value: {
    fontSize: 22,
  },
});
