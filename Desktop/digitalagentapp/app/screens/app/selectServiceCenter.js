import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { SelectPage } from "../../components";
import { base_url } from "../../config/const";
export default class SelectServiceCenter extends Component {
  state = {
    searchTxt: "",
    api: ""
  };

  vedom = this.props.navigation.getParam("vedom", "default");
  district = this.props.navigation.getParam("district", "default");
  async componentDidMount() {
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
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN", token);
    console.log("District", this.district);
    try {
      axios
        .get(base_url + this.state.api + this.district, {
          headers: { Authorization: token }
        })
        .then(res => {
          console.log("CON", res);
          if (this.vedom === "con") {
            this.setState({ cons: res.data.cons });
          } else {
            this.setState({ cons: res.data });
          }
        });
    } catch (error) {
      console.log("err", error);
    }
  }
  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt
    });
    console.log("42", searchTxt);
  };
  handleServiceCenter = item => {
    console.log("CON_ID", item._id);
    this.props.navigation.navigate("Estimate", {
      cons: item,
      vedom: this.vedom
    });
  };
  render() {
    console.log("VEDOMS", this.vedom);
    var data = this.state.cons;
    var searchString = this.state.searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <SelectPage
      type={"center"}
      vedom={this.vedom}
        advanced={true}
        searchTxt={this.state.searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header="Выберите учреждение"
        data={data}
        onPressCity={item => this.handleServiceCenter(item)}
      />
    );
  }
}
