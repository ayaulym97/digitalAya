import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../uitls/theme";
const Footer = ({footerStyle}) => {
  return (
    <View style={footerStyle}>
      <Text style={styles.upText}>
      © 2018 Digital Agent. Все права защищены.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upText: {
    color:Theme.colors.gray42,
    fontSize: Theme.fonts.sizes.p3
  },
});
export default Footer;
