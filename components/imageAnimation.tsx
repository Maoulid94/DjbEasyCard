import { View, Animated, Image, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

const images = [
  require("../assets/images/ph1.jpeg"),
  require("../assets/images/ph2.jpeg"),
  require("../assets/images/ph3.jpeg"),
  require("../assets/images/ph4.jpeg"),
  require("../assets/images/ph5.jpeg"),
];
export default function ImageAnimation() {
  const fadeValues = useRef(images.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    const animations = images.map((_, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeValues[index], {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeValues[index], {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
    );
    animations.forEach((anim, index) => {
      setTimeout(() => anim.start(), index * 500);
    });
    return () => animations.forEach((anim) => anim.stop());
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Images Row */}
      <View style={styles.animationRow}>
        {images.map((img, index) => (
          <Animated.View
            key={index}
            style={[styles.box, { opacity: fadeValues[index] }]}
          >
            <Image source={img} style={styles.image} />
          </Animated.View>
        ))}
        {/* Main Image Below Animation */}
      </View>
      <Image
        style={styles.imageMain}
        source={require("../assets/images/ph6.jpeg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // position: "absolute",
    // top: 0,
    backgroundColor: "red",
  },
  animationRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginLeft: "5%",
    marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: "90%",
  },
  box: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 30,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  imageMain: {
    width: "90%",
    height: 420,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
});
