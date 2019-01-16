import React, { Component } from "react";
import { AsyncStorage, View, StyleSheet } from "react-native";
import axios from "axios";
import { SelectPage } from "../../components";
import { base_url } from "../../config/const";
export default class SelectDistricts extends Component {
  state = {
    searchTxt: ""
  };
  city = this.props.navigation.getParam("city", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    this.setState({ token });
    console.log("City", this.city, "TOKEN", this.state.token);
    try {
      axios
        .get(base_url + `/api/region/bycity/` + this.vedom + "/" + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          this.setState({ districts: res.data.regions });
          console.log("districts", this.state.districts);
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
  handleDistrict = (item) => {
    console.log("TOKEN", this.state.token);
    console.log("District", item);
    switch (this.vedom) {
      case "con":
        this.setState({
          api: `/api/con/byregion/`
        });
        break;
      case "kgd":
        this.setState({
          api: `/api/kgd/`
        });
        break;
      case "mtszn":
        this.setState({
          api: `/api/mtszn/`
        });
        break;

      default:
        break;
    }
    try {
      axios
        .get(base_url + `/api/con/byregion/` + item, {
          headers: { Authorization: this.state.token }
        })
        .then(res => {
          if (this.vedom === "con") {
            this.setState({ cons: res.data.cons });
          } else {
            this.setState({ cons: res.data });
          }
   
        });
    } catch (error) {
      console.log("err", error);
    }
  };
  render() {
    const { districts, searchTxt } = this.state;
    var data = districts;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <SelectPage
        type={"district"}
        vedom={this.vedom}
        searchTxt={searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите район"
        data={data}
        onPressCity={(item) => this.handleDistrict(item._id)}
      />
    );
  }
}
