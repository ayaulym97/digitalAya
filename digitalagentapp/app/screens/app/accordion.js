import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import { withNavigation } from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { Footer, SearchInput,Tout } from "../../components";
import { base_url } from "../../config/const";

export default class Accordion extends PureComponent {
  state = {
    activeTab: 0,
    cons: [],
    districts: [],
    searchTxt: "",
    token: ""
  };
  measurements = [];
  city = this.props.navigation.getParam("city", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    this.setState({ token });
    console.log("City", this.city, "TOKEN", this.state.token);
    try {
      axios
        .get(base_url + "/api/region/bycity/" + this.vedom + "/" + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          this.setState({ districts: res.data.regions });
          0;
        });
    } catch (error) {
      console.log("err", error);
    }
  }

  handleDistricts = (item, index) => {
    this.setState(prevState => ({
      activeTab: prevState.activeTab === index ? -1 : index
    }));
    let api;
    switch (this.vedom) {
      case "con":
        api = "/api/con/byregion/";
        break;
      case "kgd":
        api = "/api/kgd/";
        break;
      default:
        break;
      //we don't need mtszn because it goes to another page
    }
    try {
      axios
        .get(base_url + api + item._id, {
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
  // handleCenter = item => {
  //   this.props.navigation.navigate("SelectServiceCenter", {
  //     district: item,
  //     vedom: this.vedom
  //   });
  // };
  setScrollRef = node => {
    //store a reference to the scroll view so we can call its scrollTo method
    if (node) {
      this.scrollViewRef = node;
    }
  };

  handleLayout = (measurements, toutIndex) => {
    //this process is expensive, so we only want to measure when necessary. Probably could be optimized even further...
    if (!this.measurements[toutIndex]) {
      //if they dont already exist...
      this.measurements[toutIndex] = measurements; //...put the measurements of each tout into its proper place in the array
    }
  };
  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt
    });
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
      <View style={StylePanel.selectContainer}>
        <View style={StylePanel.upView}>
          <SearchInput
            value={searchTxt}
            onChangeText={searchTxt => this.handleSearchBar(searchTxt)}
          />
          <Text style={StylePanel.header}>Выберите район</Text>
        </View>
        <View style={StylePanel.downView}>
          {data ? (
            <ScrollView scrollEventThrottle={20} ref={this.setScrollRef}>
              {data.map((item, index) => {
                return (
                  <Tout
                    key={index}
                    toutIndex={index} //tout index will help us know which tout we are clicking on
                    item={item}
                    cons={this.state.cons}
                    activeTab={this.state.activeTab}
                    isOpenTab={item._id === this.state.activeTab}
                    handleDistricts={() => this.handleDistricts(item, item._id)}
                    handleLayout={() => this.handleLayout()} //when layout is triggered for touts, we can measure them
                  />
                );
              })}
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color={Theme.colors.yellow} />
          )}
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cityContainer: {
    width: "92%",
    marginHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  upView: {
    flex: 1
  },
  advancedcityContainer: {
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
  }
});
