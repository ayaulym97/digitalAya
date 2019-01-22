import React from "react";
import {
  Linking,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Theme } from "../uitls/theme";
const Footer = ({ footerStyle }) => {
  return (
    <View style={footerStyle}>
      <Text style={styles.upText}>©2019</Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://digitalagent.kz/intro/");
        }}
      >
        <Text style={styles.yellowText}>Digital Agent.</Text>
      </TouchableOpacity>

      <Text style={styles.upText}>Все права защищены.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upText: {
    marginHorizontal: 3,
    color: Theme.colors.gray42,
    fontSize: Theme.fonts.sizes.p3
  },
  yellowText: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p3
  }
});
export default Footer;
