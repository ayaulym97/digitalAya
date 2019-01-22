import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../uitls/theme";
const ComplaintScoreFive = ({ title, img,checked }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity style={styles.scoreFiveBox}>
        <Image resizeMode={"contain"} style={styles.image} source={img} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32
  },

  title: {
    textAlign: "center",
    marginTop: 6,
    fontSize: Theme.fonts.sizes.p1,
    color: "white"
  },
  scoreFiveBox: {
    backgroundColor: Theme.colors.bcground,
    width: 60,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scoreFiveView: {
    backgroundColor: Theme.colors.bcground,
    width: "17%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default ComplaintScoreFive;
