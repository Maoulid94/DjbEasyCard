import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

interface DataTypes {
  onPressCancel: () => void;
  onPressSubmit: () => void;
}

export default function SubmitButton({
  onPressCancel,
  onPressSubmit,
}: DataTypes) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.box, { marginLeft: 6 }]}
        onPress={onPressCancel}
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={onPressSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: 10,
    backgroundColor: "yellow",
    padding: 5,
    borderRadius: 10,
    marginBottom: 8,
  },
  box: {
    width: "38%",

    fontSize: 18,
    padding: 9,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    fontFamily: "bold",
  },
});
