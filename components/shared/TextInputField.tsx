import { Text, View, TextInput, StyleSheet } from "react-native";
interface TextInputType {
  label: string;
  onChangeText: (text: string) => void;
  value:string
  password?: boolean;
}
export default function TextInputField({
  label,
  onChangeText,
  value,
  password,
}: TextInputType) {
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        secureTextEntry={password}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    marginLeft: 25,
  },
  input: {
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 15,
  },
});
