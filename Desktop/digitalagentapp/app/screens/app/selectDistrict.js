import React, { Component } from "react";
import { AsyncStorage, View, StyleSheet } from "react-native";
import axios from "axios";
import Accordion from "react-native-collapsible/Accordion";
import { SelectPage } from "../../components";
import { base_url } from "../../config/const";
export default class SelectDistrict extends Component {
  state = {
    searchTxt: ""
  };
  city = this.props.navigation.getParam("city", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN", token);
    console.log("City", this.city);

    try {
      axios
        .get(base_url + `/api/region/bycity/` + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          console.log("regions", res.data.regions);
          const regions = res.data.regions.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
          this.setState({ regions });
        });
    } catch (error) {
      console.log("err", error);
    }
  }

  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt
    });
    console.log("RER", searchTxt);
  };
  handleDistrict = item => {
    this.props.navigation.navigate("SelectServiceCenter", {
      district: item,
      vedom: this.vedom
    });
  };
  render() {
    const { regions, searchTxt } = this.state;
    var data = regions;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    console.log("vedomect", this.vedom);
    return (
      <SelectPage
        searchTxt={searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите район"
        data={data}
        onPressCity={item => this.handleDistrict(item._id)}
      />
    );
  }
}
