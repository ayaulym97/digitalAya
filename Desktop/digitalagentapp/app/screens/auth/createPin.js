import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import { LogoView } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";

export default class CreatePin extends Component {
  state = {
    code: 0
  };

  handleCode = code => {
    this.setState({
      code
    });
  };

  render() {
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.downView}>
          <Text style={styles.header}>Придумaйте код доступa</Text>
          <CodeInput
            keyboardType="numeric"
            className={"border-b"}
            secureTextEntry
            activeColor={Theme.colors.yellow}
            inactiveColor={Theme.colors.gray74}
            codeLength={4}
            space={16}
            size={33}
            codeInputStyle={{ fontSize: 28, fontWeight: "100" }}
            inputPosition="center"
            onFulfill={code => this.handleCode(code)}
          />
          <Text style={styles.subtitle}>
            Вы будете вводить его при входе в приложение
          </Text>
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
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    fontWeight: "100"
  }
});
