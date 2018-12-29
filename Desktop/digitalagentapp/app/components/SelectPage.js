import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from "react-native";
import { Theme } from "../uitls/theme";
import { StylePanel } from "../uitls/styles";
import { Footer, SearchInput } from "../components";
import { scaleModerate } from "../uitls";
const SelectPage = ({
  data,
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
                <TouchableOpacity
                  style={StylePanel.cityContainer}
                  onPress={() => onPressCity(item)}
                >
                  <Text style={StylePanel.cityTxt}>{item.name}</Text>
                </TouchableOpacity>
                {
                  
                  <View>
                    <Text>FFFFFF</Text>
                  </View>
                }
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

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.checkboxGray,
    marginHorizontal: "4%",
    marginVertical: "29%"
  },
  attenTxt: {
    marginTop: scaleModerate(30),
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontWeight: "100"
  },
  contentTxt: {
    marginTop: scaleModerate(16),
    width: "95%",
    fontSize: Theme.fonts.sizes.p6,
    color: "white",
    textAlign: "center"
  },
  crossBtn: {
    position: "absolute",
    right: 20
  },
  phoneBtnTxt: {
    marginTop: scaleModerate(5),
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6
  }
});
export default SelectPage;
