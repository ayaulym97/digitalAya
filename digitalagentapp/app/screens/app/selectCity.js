import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { base_url } from "../../config/const";
import { SelectPage } from "../../components";
export default class SelectCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: ""
    };
  }
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorage.getItem("id_token");
    console.log("USER_ID", user_id, "TOKEN_ID", token);
    axios
      .get(base_url + `/api/city/all`, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ cities: res.data.cities });
        console.log("CITY", this.state.cities);
      });
  }
  handleSearchBar = searchTxt => {
    this.setState({ searchTxt });
  };
  handleCity = item => {
    this.props.navigation.navigate("Accordion", {
      city: item,
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
      <SelectPage
        type={"city"}
        vedom={this.vedom}
        searchTxt={this.state.searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите регион"
        data={data}
        onPressCity={item => this.handleCity(item._id)}
      />
    );
  }
}
