import React from "react";
import { scale } from "../uitls/index";
import { View, Image, StyleSheet } from "react-native";
const LogoView = ({ logostyle }) => {
  return (
    <View style={logostyle}>
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={require("../assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "27%",
    height: "29%",
    marginHorizontal: "36%"
  }
});
export default LogoView;
