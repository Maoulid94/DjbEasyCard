import { View, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.logoBox}>
      <Image
        source={require("../../assets/images/logo_dbj.png")}
        style={{ resizeMode: "contain", height: 160 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logoBox: {
    width: 185,
    height: 185,
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 95,
  },
});
