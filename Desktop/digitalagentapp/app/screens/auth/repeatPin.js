import React, { Component } from "react";
import {
  View,
  Animated,
  Alert,
  TextInput,
  Text,
  StyleSheet
} from "react-native";
import { LogoView } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import InputView from "../../components/PinView/InputView";
import Styles from "../../components/PinView/styles";
import deviceStorage from "../../service/deviceStorage";
export default class RepeatPin extends Component {
  state = {
    animatedInputIndex: "",
    pinViewAnim: new Animated.Value(0)
  };
  code = this.props.navigation.getParam("code", "default");
  handleCode = animatedInputIndex => {
    this.setState({
      animatedInputIndex
    });
    console.log("INDEX", animatedInputIndex);
    if (animatedInputIndex.length === 4) {
      if (this.code === animatedInputIndex) {
        deviceStorage.saveKey("pincode", this.code);
        setTimeout(() => {
          this.props.navigation.navigate("App");
        }, 500);
      } else {
        this.setState({
          animatedInputIndex: ""
        });
        Alert.alert("Ваш пароль и пароль подтверждения не совпадают");
      }
    }
  };

  render() {
    console.log("CODe", this.code);
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />

        <View style={styles.downView}>
          <Text style={styles.header}>Повторите код доступа</Text>
          <InputView
            bgOpacity={0.1}
            pinLength={4}
            activeBgColor={"#333"}
            animatedInputIndex={this.state.animatedInputIndex}
            pinViewAnim={this.state.pinViewAnim}
            bgColor={"#333"}
            styles={[
              Styles.passwordInputView,
              Styles.passwordInputViewItem,
              Styles.passwordInputViewItemActive
            ]}
          />
          <TextInput
            autoFocus={true}
            blurOnSubmit={true}
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={animatedInputIndex =>
              this.handleCode(animatedInputIndex)
            }
            value={this.state.animatedInputIndex}
            placeholder="EEE"
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  downView: {
    flex: 5
    // backgroundColor: "blue"
  },
  logoView: {
    flex: 1.5,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    fontWeight: "100"
  },
  subtitle: {
    paddingTop: 32,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    fontWeight: "100"
  },
  input: {
    backgroundColor: "red",
    position: "absolute",
    right: -99,
    top: 24
  }
});
