import { Text, View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";
interface TextInputType {
  label: string;
  onChangeText: (text: string) => void;
  value: string;
  password?: boolean;
}
export default function TextInputField({
  label,
  onChangeText,
  value,
  password,
}: TextInputType) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={[styles.text, { color: colors.TEXT_GRAY }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.BG_CONTENT,
            color: colors.TEXT_GRAY,
            borderColor: colors.TEXT_GRAY,
          },
        ]}
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
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 15,
  },
});
