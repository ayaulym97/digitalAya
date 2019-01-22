import React from "react";
import { TouchableOpacity, Text, Platform, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../uitls/theme";
const Checkbox = ({ checked, title, onChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <Icon
        name={checked ? "md-checkbox" : "md-square-outline"}
        size={28}
        color={checked ? "#67ac5b" : Theme.colors.gray63}
        style={{ marginHorizontal: 10 }}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    width: "90%",
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  }
});
export default Checkbox;
