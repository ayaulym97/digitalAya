import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Theme } from "../../uitls/theme";
import Icon from "react-native-vector-icons/Ionicons";
const AdvancedSelectItem = ({  onPressCity, item, vedom }) => {
  return (
    <TouchableOpacity
      style={styles.cityContainer}
      onPress={() => onPressCity(item)}
    >
      <View style={styles.content}>
        <Text style={styles.cityTxt}>{item.name}</Text>
        {vedom === "con" ? null : (
          <Text style={styles.addressTxt}>{item.address}</Text>
        )}
      </View>

      <Icon name={"ios-arrow-forward"} size={24} color={Theme.colors.gray63} />
    </TouchableOpacity>
  );
};

export default AdvancedSelectItem;
const styles = StyleSheet.create({
  upView: {
    flex: 1
  },
  cityContainer: {
    width: "92%",
    marginHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  cityTxt: {
    color: "white",
    fontWeight: "500",
    fontSize: Theme.fonts.sizes.p6
  },
  addressTxt: {
    paddingTop: 10,
    color: "#727272",
    fontSize: Theme.fonts.sizes.p4
  },

  content: {
    width: "95%"
  }
});
