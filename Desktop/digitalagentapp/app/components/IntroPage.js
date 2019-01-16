import React from "react";
import { View, Image,Platform, Text, StyleSheet } from "react-native";
import { scale } from "../uitls/index";
import { Theme } from "../uitls/theme";

const IntroPage = ({ img, header, txt }) => {
  return (
    <View style={styles.slide}>
      <Image resizeMode={"contain"} style={styles.image} source={img} />

      <View style={styles.text}>
        <Text style={styles.title}>{header}</Text>
        <Text style={styles.subtitle}>{txt}</Text>
      </View>
    </View>
  );
};
export default IntroPage;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center"
  },
  image: {
    width: scale(215),
    height: scale(180)
  },
  text: {
    flex: 0.5,
    width: "90%",
    alignContent: "center",
    marginHorizontal: "5%",
    marginTop: 30
  },
  title: {
    fontWeight: "100",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.yellow,
    textAlign: "center",
    marginBottom: 15
  },
  subtitle: {
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});