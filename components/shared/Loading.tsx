import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "./ThemeContext";

type LoadingProps = { visible: boolean };

export default function Loading({ visible }: LoadingProps) {
  const { colors } = useTheme();
  if (!visible) return null;
  return (
    <Modal visible={visible} transparent={true}>
      <View style={[styles.container, { backgroundColor: colors.BG_Loading }]}>
        <ActivityIndicator size="large" color={colors.BG_TINT} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
