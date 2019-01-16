import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  ScrollView
} from "react-native";
import {
  SelectPage,
  Footer,
  SearchInput,
  SelectItem,
  AdvancedSelectItem
} from "../../components";
import Collapsible from "react-native-collapsible";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import axios from "axios";
import { base_url } from "../../config/const";
import { Accordion } from "../../components/Accordion";
export default class SelectDistrict extends Component {
  state = {
    searchTxt: "",
    cons: [],
    expanded: false
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
  handleDistrict = item => {
    this.props.navigation.navigate("SelectServiceCenter", {
      district: item._id,
      vedom: this.vedom
    });
  };
  handleDistricts = (item, index) => {
    this.setState({
      expanded: !this.state.expanded
    });

    switch (this.vedom) {
      case "con":
        this.setState({
          api: `/api/con/byregion/`
        });
        console.log("API", this.state.api);
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
        .get(base_url + `/api/con/byregion/` + item._id, {
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

    console.log("District_ITEM", item);
    console.log("TOGGLE", this.state.expanded, this.vedom);
    console.log("TOKEN", this.state.token);
    console.log("CONS", Object.keys(this.state.cons));
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
    //   <SelectPage
    //   type={"district"}
    //   vedom={this.vedom}
    //   searchTxt={searchTxt}
    //   onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
    //   header="Выберите район"
    //   data={data}
    //   onPressCity={(item) => this.handleDistrict(item)}
    // />
       ///*
        <View style={StylePanel.selectContainer}>
        <View style={StylePanel.upView}>
          <SearchInput
            value={searchTxt}
            onChangeText={searchTxt => this.handleSearchBar(searchTxt)}
          />
          <Text style={StylePanel.header}>Выберите район</Text>
        </View>
        <View style={StylePanel.downView}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            {data ? (
             // /*   
              
              
              data.map((item, index) => {
                return (
                  <View>
                    <SelectItem
                      id={index}
                      item={item}
                      index={index}
                      vedom={this.vedom}
                      onPressCity={() => this.handleDistricts(item, index)}
                    />
                    {this.state.expanded ? (
                      <ScrollView>
                        {Object.keys(this.state.cons).map(key => (
                          <AdvancedSelectItem
                            key={key}
                            item={this.state.cons[key]}
                            vedom={this.vedom}
                            onPressCity={() => console.log("FFFF")}
                          />
                        ))}
                      </ScrollView>
                    ) : null}
                  </View>
                );
              })
            
              // <FlatList
              //   data={data}
              //   keyExtractor={(item, index) => index.toString()}
              //   renderItem={({ item, index }) => (
              //     <SelectItem
              //       item={item}
              //       index={index}
              //       vedom={this.vedom}
              //       type={"district"}
              //       onPressCity={() => this.handleDistrict(item)}
              //     />
              //   )}
              // />
            ) : (
              <ActivityIndicator size="large" color={Theme.colors.yellow} />
            )}
          </ScrollView>
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
     /// */
     
    );
  }
}
