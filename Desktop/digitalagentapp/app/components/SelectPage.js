import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Theme } from "../uitls/theme";
import { StylePanel } from "../uitls/styles";
import { Footer, SearchInput } from "../components";
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
