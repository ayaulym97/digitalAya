import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
const SelectItem = ({ id, onPressCity, item, type, vedom, index }) => {
  return (
    <TouchableOpacity
      key={id}
      style={
        index === 0 && vedom === "con" && type === "district"
          ? styles.specotdel
          : StylePanel.cityContainer
      }
      onPress={() => onPressCity(item, index)}
    >
      <Text style={StylePanel.cityTxt}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default SelectItem;
const styles = StyleSheet.create({
  specotdel: {
    backgroundColor: Theme.colors.yellow,
    paddingVertical: 12,
    paddingLeft: "4%"
  }
});
