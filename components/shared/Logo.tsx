import { View, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.logoBox}>
      <Image source={require("../../assets/images/logo.png")} />
    </View>
  );
}
const styles = StyleSheet.create({logoBox: {
  width: 250,
  height: 160,
  alignSelf: "center",
  backgroundColor: "black",
  marginBottom: 10,
  borderRadius: 15,
},});
