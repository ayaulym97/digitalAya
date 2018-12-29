import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  AsyncStorage
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { base_url } from "../../config/const";
import { StylePanel } from "../../uitls/styles";
import { Call, SelectPage } from "../../components";
import { Theme } from "../../uitls/theme";
export default class SelectCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisiblle: false,
      searchTxt: ""
    };
  }
  args = {
    number: "87476662206",
    prompt: false
  };
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    this.setState({ modalVisible: true });
    {/*var first = "role";
    data.sort(function(x, y) {
      return x == first ? -1 : y == first ? 1 : 0;
    });

  console.log(data);*/}

    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN_25", user_id, token);
    axios
      .get(base_url + `/api/city/all`, {
        headers: { Authorization: token }
      })
      .then(res => {
        const cities = res.data.cities.sort(function(a, b) {

          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
     
        this.setState({ cities });
        console.log("CITY", cities);
      });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleSearchBar = searchTxt => {
    this.setState({ searchTxt });
  };
  handleCity = item => {
    this.props.navigation.navigate("SelectDistrict", {
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
      <View style={StylePanel.selectContainer}>
        <SelectPage
          searchTxt={this.state.searchTxt}
          onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
          header="Выберите регион"
          data={data}
          onPressCity={item => this.handleCity(item._id)}
        />
        <Modal
          onRequestClose={() => this.setState({ modalVisible: false })}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon name="ios-close" size={46} color={Theme.colors.gray63} />
            </TouchableOpacity>

            <Image
              resizeMode={"contain"}
              style={{
                width: 80,
                height: 96,
                marginTop: 50
              }}
              source={require("../../assets/attenIcon.png")}
            />
            <Text style={styles.attenTxt}>Внимание</Text>

            <Text style={styles.contentTxt}>
              Данное приложение работает в тестовом режиме (30 дней). Мы
              благодарны, что Вы являетесь нашим пользователем и надеемся при
              помощи Вас улучшить приложение. В случае, если возникнут
              технические сбои,
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: Theme.fonts.sizes.p6 }}>
                звоните на номер{" "}
              </Text>
              <TouchableOpacity
                onPress={() => Call(this.args).catch(console.error)}
              >
                <Text style={styles.phoneBtnTxt}>{this.args.number}</Text>
                <Image
                  resizeMode={"contain"}
                  style={{ width: "100%" }}
                  source={require("../../assets/lineTwo.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.checkboxGray,
    marginHorizontal: "4%",
    marginVertical: "29%"
  },
  attenTxt: {
    marginTop: 30,
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontWeight: "100"
  },
  contentTxt: {
    marginTop: 16,
    width: "95%",
    fontSize: Theme.fonts.sizes.p4,
    color: "white",
    textAlign: "center"
  },
  crossBtn: {
    position: "absolute",
    right: 20
  },
  phoneBtnTxt: {
    marginTop: 5,
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6
  }
});
