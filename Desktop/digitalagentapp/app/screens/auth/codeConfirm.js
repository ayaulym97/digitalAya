import React, { Component } from "react";
import {
  View,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "axios";
import CodeInput from "react-native-confirmation-code-input";
import { Button, LogoView, Footer } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import deviceStorage from "../../service/deviceStorage";
import { base_url } from "../../config/const";
export default class CodeConfirm extends Component {
  state = {
    code: 0,
    error: false
  };
  userId = this.props.navigation.getParam("data", "default");
  phone = this.props.navigation.getParam("phone", "default");

  handleCode = code => {
    this.setState({
      code
    });
  };
  sendCode() {
    const { code } = this.state;
    console.log("CODECCONFIRM", code, this.userId, this.phone);
    axios
      .post(base_url + "/api/auth/checksms", {
        user_id: this.userId,
        code: code
      })
      .then(response => {
        deviceStorage.saveKey("id_token", response.data.token);
        console.log("ID_TOKEN", response.data.token);
        // this.props.navigation.navigate("CreatePin");
        this.props.navigation.navigate("App");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  }
  resendCode() {
    axios
      .post(base_url + "/api/auth/resendcode/" + this.userId)
      .then(response => {
        console.log("TOKEN", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.downView}>
          <Text style={styles.header}>Введите SMS код</Text>
          <Text style={styles.codeSendTxt}>
            Код отправлен на номер:
            {this.phone}
          </Text>
          <CodeInput
            keyboardType="numeric"
            className={"border-b"}
            activeColor={Theme.colors.yellow}
            inactiveColor={Theme.colors.gray74}
            codeLength={4}
            space={16}
            size={33}
            codeInputStyle={styles.codeinput}
            inputPosition="center"
            onFulfill={code => this.handleCode(code)}
          />
          <View style={{ flex: 4 }}>
            <TouchableOpacity
              style={styles.repeatBtn}
              onPress={() => this.resendCode()}
            >
              <Text style={styles.repeatTxt}>Повторно отправить SMS</Text>
              <Image
                resizeMode={"contain"}
                style={{ width: "56%", marginHorizontal: "22%" }}
                source={require("../../assets/line.png")}
              />
            </TouchableOpacity>

            <Button
              text={"Отправить"}
              sendBtn={styles.sendBtn}
              onPress={() => this.sendCode()}
            />
          </View>
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
        <Modal
          onRequestClose={() => this.setState({ error: false })}
          animationType="fade"
          transparent={true}
          visible={this.state.error}
        >
          <View style={styles.modal}>
            <View style={styles.subModal}>
              <Text style={[styles.sendBtnTxt, { color: "white" }]}>
                Код неверный.
              </Text>

              <TouchableOpacity
                style={[
                  styles.error,
                  { borderColor: Theme.colors.yellow, borderWidth: 1 }
                ]}
                onPress={() => this.setState({ error: false, code: 0 })}
              >
                <Text
                  style={[styles.sendBtnTxt, { color: Theme.colors.yellow }]}
                >
                  Ввести код еще раз
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  downView: {
    flex: 6
  },

  codeinput:{
    fontSize: 28,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  logoView: {
    flex: 1.5,
    alignContent: "center",
    paddingTop: 35
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h1,
    paddingTop: 35,
    paddingBottom: 10,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  codeSendTxt: {
    width: "50%",
    color: "white",
    textAlign: "center",
    fontSize: Theme.fonts.sizes.p4,
    marginHorizontal: "25%",
    marginTop: 6
  },
  repeatBtn: {
    marginBottom: 20
  },
  repeatTxt: {
    width: "100%",
    textAlign: "center",
    paddingTop: 10,
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p4
  },
  error: {
    width: "80%",
    height: 45,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtn: {
    width: "80%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "10%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  footerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  upText: {
    color: Theme.colors.gray42,
    fontSize: Theme.fonts.sizes.p3
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  subModal: {
    paddingTop: 34,
    width: "70%",
    height: "20%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Theme.colors.checkboxGray
  },
  sendBtnTxt: {
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
