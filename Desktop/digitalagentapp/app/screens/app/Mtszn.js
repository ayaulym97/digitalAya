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
    this.setState({ modalVisible: true });
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
        console.log("CITY", res.data);
      });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
          searchTxt={this.state.searchTxt}
          onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
          header="Выберите учреждение"
          data={data}
          onPressCity={item => this.handleCity(item)}
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
              {/* <TouchableOpacity
                //onPress={() => Call(this.args).catch(console.error)}
              > */}
              <View>
                <Text style={styles.phoneBtnTxt}>87476662206</Text>
                <Image
                  resizeMode={"contain"}
                  style={{ width: "100%" }}
                  source={require("../../assets/lineTwo.png")}
                />
              </View>
              {/* </TouchableOpacity> */}
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
    marginVertical: "20%"
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
    width: "98%",
    fontSize: Theme.fonts.sizes.p6,
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
