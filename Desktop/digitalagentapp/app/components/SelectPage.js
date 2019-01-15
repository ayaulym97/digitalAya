import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../uitls/theme";
import { StylePanel } from "../uitls/styles";
import { Footer, SearchInput } from "../components";
const SelectPage = ({
  data,
  advanced,
  header,
  searchTxt,
  onChangeSearchTxt,
  onPressCity
}) => {
  return (
    <View style={StylePanel.selectContainer}>
      <View style={StylePanel.upView}>
        <SearchInput value={searchTxt} onChangeText={onChangeSearchTxt} />
        <Text style={StylePanel.header}>{header}</Text>
      </View>
      <View style={StylePanel.downView}>
        {data ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <React.Fragment>
                {advanced ? (
                  <TouchableOpacity
                    style={styles.cityContainer}
                    onPress={() => onPressCity(item)}
                  >
                    <View style={styles.content}>
                      <Text style={styles.cityTxt}>{item.name}</Text>
                      {this.vedom === "con" ? null : (
                        <Text style={styles.addressTxt}>{item.address}</Text>
                      )}
                    </View>
                    <Icon
                      name={"ios-arrow-forward"}
                      size={24}
                      color={Theme.colors.gray63}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={StylePanel.cityContainer}
                    onPress={() => onPressCity(item)}
                  >
                    <Text style={StylePanel.cityTxt}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              </React.Fragment>
            )}
          />
        ) : (
          <ActivityIndicator size="large" color={Theme.colors.yellow} />
        )}
      </View>
      <Footer footerStyle={StylePanel.footerStyle} />
    </View>
  );
};

export default SelectPage;
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
  },

});
