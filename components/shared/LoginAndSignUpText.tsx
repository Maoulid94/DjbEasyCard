import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface DataTypes {
  text: string;
  link: string;
  onPress: () => void;
}

export default function LoginAndSignUpText({ text, link, onPress }: DataTypes) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{link}</Text>
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
