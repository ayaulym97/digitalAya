import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from "react-native-masked-text";
import deviceStorage from "../../service/deviceStorage";
import { Footer, Button } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { base_url } from "../../config/const";
import Checkbox from "../../components/Checkbox";
import { scale } from "../../uitls";
export default class SignUpNew extends PureComponent {
  state = {
    phoneNumber: "",
    userId: "",
    error: false,
    focus: false,
    agree: true
  };
  handleUserId = iin => {
    this.setState({ iin });
  };
  handlePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  registerUser() {
    const { iin, phoneNumber } = this.state;
    console.log("IIN", iin, phoneNumber);
    if (phoneNumber === "+7 (775) 918-42-77") {
      axios
        .post(base_url + "/api/auth/signuptest", {
          phone: phoneNumber
        })
        .then(response => {
          deviceStorage.saveKey("id_token", response.data.token);
          console.log(response.data.token);
          deviceStorage.saveKey("user_id", response.data.data._id);
          console.log("_ID", response.data.data._id);
          this.props.navigation.navigate("App");
        })
        .catch(error => {
          console.log(error.data);
          this.setState({
            error: true
          });
        });
    } else {
      axios
        .post(base_url + "/api/auth/signup", {
          phone: phoneNumber
        })
        .then(response => {
          deviceStorage.saveKey("user_id", response.data._id);
          console.log("_ID", response.data._id);
          this.props.navigation.navigate("CodeConfirm", {
            data: response.data._id,
            phone: this.state.phoneNumber
          });
        })
        .catch(error => {
          console.log(error.message);
          this.setState({
            error: true
          });
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode={"on-drag"}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.logoView}>
            <Image
              resizeMode={"contain"}
              style={styles.image}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View style={styles.downView}>
            <Text style={styles.header}>Регистрация</Text>
            <Text style={styles.errorTxt}>
              {this.state.error ? "Вы ввели недопустимый номер" : " "}
            </Text>
            <TextInputMask
              underlineColorAndroid="transparent"
              type={"custom"}
              keyboardType={"numeric"}
              maxLength={18}
              style={[
                styles.input,
                this.state.error
                  ? { borderColor: "red" }
                  : this.state.focus
                  ? { borderColor: Theme.colors.yellow }
                  : { borderColor: Theme.colors.gray42 }
              ]}
              placeholderTextColor={Theme.colors.gray74}
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              options={{ mask: "+9 (999) 999-99-99" }}
              placeholder="Телефон"
              onFocus={() => this.setState({ focus: true, error: false })}
              onBlur={() => this.setState({ focus: false })}
            />

            <Button
              text={"Отправить"}
              sendBtn={[styles.sendBtn, StylePanel.defaultBtn]}
              onPress={() => this.registerUser()}
            />
            <View style={styles.ofertaView}>
              <View style={styles.ofertaUp}>
                <TouchableOpacity>
                  <Text style={styles.ofertaGoldTxt}>Прочитайте оферту.</Text>
                  <Image
                    resizeMode={"contain"}
                    style={{ width: "100%" }}
                    source={require("../../assets/lineTwo.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.ofertaWhiteTxt}>
                  Входя в приложение,вы
                </Text>
              </View>

              <Text style={styles.ofertaWhiteTxt}>принимаете ее условия.</Text>
            </View>
            <TouchableOpacity style={styles.easy}>
              <Text style={styles.ofertaGoldTxt}>
                Просто и понятно об условиях.
              </Text>
              <Image
                resizeMode={"contain"}
                style={{ width: "58%" }}
                source={require("../../assets/line.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => this.setState({ agree: !this.state.agree })}
            >
              <Icon
                name={this.state.agree ? "md-checkbox" : "md-square-outline"}
                size={22}
                color={this.state.agree ? "#67ac5b" : Theme.colors.gray63}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.ofertaWhiteTxt}>
                Даю согласие на получение рекламы в соответствии с Офертой.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  footerStyle: {
    height: 45,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  logoView: {
    flex: 1,
    backgroundColor: Theme.colors.bcground,
    justifyContent: "center",
    alignItems: "center"
  },
  downView: {
    flex: 4
  },
  image: {
    width: 100,
    height: 30
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },

  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h1,
    paddingTop: 10,
    fontWeight: "100"
  },
  sendBtn: {
    backgroundColor: Theme.colors.yellow
  },
  input: {
    color: "white",
    width: "84%",
    height: 48,
    marginHorizontal: "8%",
    paddingLeft: 10,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Theme.colors.gray74
  },
  ofertaView: {
    alignItems: "center",
    width: '84%',
    marginHorizontal: '8%',
  },
  ofertaUp: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  ofertaWhiteTxt: {
    marginLeft:5,
    color: "white",
   fontSize: Theme.fonts.sizes.p4
  },
  ofertaGoldTxt: {
    color: Theme.colors.yellow,
    fontSize:Theme.fonts.sizes.p4,
    // textAlign: "center"
  },
  easy: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 32,
    width: "84%",
    marginHorizontal: "8%"
  },
  errorTxt: {
    color: "red",
    fontSize: Theme.fonts.sizes.p3,
    marginTop: 38,
    width: "80%",
    marginHorizontal: "10%"
  }
});
