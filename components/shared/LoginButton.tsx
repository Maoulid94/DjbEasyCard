import { Text, TouchableOpacity, StyleSheet } from "react-native";
interface ButtonType {
  text: string;
  onPress: () => void;
  loading?: boolean;
}

export default function Button({ text, onPress, loading = false }: ButtonType) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "green",
    marginHorizontal: 15,
  },
  text: { fontSize: 18, textAlign: "center" },
});
