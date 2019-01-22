import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
  Footer,
  SearchInput,
  SelectItem,
  AdvancedSelectItem
} from "..";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";

const SelectPage = ({
  type,
  advanced,
  data,
  header,
  searchTxt,
  onChangeSearchTxt,
  onPressCity,
  vedom
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
            renderItem={({ item, index }) => (
              <React.Fragment>
                {advanced ? (
                  <AdvancedSelectItem
                    item={item}
                    vedom={vedom}
                    onPressCity={onPressCity}
                  />
                ) : (
                  <SelectItem
                    item={item}
                    index={index}
                    vedom={vedom}
                    type={type}
                    onPressCity={onPressCity}
                  />
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