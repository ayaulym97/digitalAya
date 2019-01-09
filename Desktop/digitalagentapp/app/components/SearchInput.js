import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Theme } from "../uitls/theme";
import { scale, scaleModerate, scaleVertical } from "../uitls/index";
import Icon from "react-native-vector-icons/Ionicons";
const SearchInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={"ios-search"}
        size={20}
        color={Theme.colors.gray63}
        style={{
          marginHorizontal: 7
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Поиск"
        value={value}
        placeholderTextColor={Theme.colors.gray63}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    height: scaleVertical(35),
    marginHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Theme.colors.gray63,
    borderWidth: 1
  },
  input: {
    flex: 1,
    color: "white"
  }
});
export default SearchInput;
