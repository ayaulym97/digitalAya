import React, { Component } from "react";
import {
  View,
  AsyncStorage
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { base_url } from "../../config/const";
import { StylePanel } from "../../uitls/styles";
import { SelectPage } from "../../components";
import { Theme } from "../../uitls/theme";
export default class Mtszn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisiblle: false,
      searchTxt: ""
    };
  }
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN_25", user_id, token);
    axios
      .get(base_url + `/api/mtszn`, {
        headers: { Authorization: token }
      })
      .then(res => {
        const cities = res.data.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        this.setState({ cities });
        console.log("MTSZN", res.data);
      });
  }
  handleSearchBar = searchTxt => {
    this.setState({ searchTxt });
  };
  handleCity = item => {
    this.props.navigation.navigate("Estimate", {
      cons: item,
      vedom: this.vedom
    });
  };
  render() {
    var data = this.state.cities;
    var searchString = this.state.searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <View style={StylePanel.selectContainer}>
        <SelectPage
          advanced={true}
          searchTxt={this.state.searchTxt}
          onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
          header="Выберите учреждение"
          data={data}
          onPressCity={item => this.handleCity(item)}
        />
      </View>
    );
  }
}