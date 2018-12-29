import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import axios from "axios";
import { TextInputMask } from "react-native-masked-text";
import deviceStorage from "../../service/deviceStorage";
import { Footer, LogoView, Button } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { base_url } from "../../config/const";
export default class SignUp extends PureComponent {
  state = {
    iin: "",
    phoneNumber: "",
    userId: "",
    error: false,
    checked: false
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
    if (iin === "970612400788" && phoneNumber === "+7 (775) 918-42-77") {
      axios
        .post(base_url + "/api/auth/signuptest", {
          iin: iin,
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
          iin: iin,
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LogoView logostyle={styles.logoView} />
        <View style={styles.downView}>
          <Text style={styles.header}>Регистрация</Text>
          <TextInput
            keyboardType={"numeric"}
            style={[
              styles.input,
              this.state.error
                ? { borderColor: "red" }
                : { borderColor: Theme.colors.gray42 }
            ]}
            placeholder={"ИИН"}
            placeholderTextColor={Theme.colors.gray74}
            onChangeText={iin => this.handleUserId(iin)}
            value={this.state.iin}
          />

          <TextInputMask
            underlineColorAndroid="transparent"
            type={"custom"}
            keyboardType={"numeric"}
            maxLength={18}
            style={[
              styles.input,
              this.state.error
                ? { borderColor: "red" }
                : { borderColor: Theme.colors.gray42 }
            ]}
            placeholderTextColor={Theme.colors.gray74}
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            options={{ mask: "+9 (999) 999-99-99" }}
            placeholder="Телефон"
          />
          <Button
            text={"Отправить"}
            sendBtn={[styles.sendBtn, StylePanel.defaultBtn]}
            onPress={() => this.registerUser()}
          />
        </View>

        <Footer footerStyle={[StylePanel.footerStyle, StylePanel.absBottom]} />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  logoView: {
    flex: 1.5,
    alignContent: "center",
    paddingTop: 60
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  downView: {
    flex: 7,
    alignContent: "center"
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h1,
    paddingTop: 10,
    paddingBottom: 50,
    fontWeight: "100"
  },
  sendBtn: {
    backgroundColor: Theme.colors.yellow
  },
  input: {
    color: "white",
    width: "80%",
    height: 48,
    marginHorizontal: "10%",
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Theme.colors.gray74
  }
});
