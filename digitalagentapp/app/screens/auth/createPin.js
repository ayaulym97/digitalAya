import React, { Component } from "react";
import { View, Animated, Platform,TextInput, Text, StyleSheet } from "react-native";
import { LogoView } from "../../components";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import InputView from "../../components/PinView/InputView";
import Styles from "../../components/PinView/styles";
export default class CreatePin extends Component {
  state = {
    // animatedInputIndex: Object.assign([]),
    animatedInputIndex: '',
    pinViewAnim: new Animated.Value(0),
    repeat: false
  };

  handleCode = animatedInputIndex => {
    if (animatedInputIndex.length === 4) {
      setTimeout(() => {
        this.props.navigation.navigate("RepeatPin", {
          code: this.state.animatedInputIndex
        });
      }, 500);
    }
    this.setState({
      animatedInputIndex
    });

    console.log("REPEEE",animatedInputIndex);
  };

  render() {
    const {animatedInputIndex,pinViewAnim} = this.state
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />

        <View style={styles.downView}>
          <Text style={styles.header}>Придумaйте код доступa</Text>
          <InputView
            bgOpacity={0.1}
            pinLength={4}
            activeBgColor={"#333"}
            animatedInputIndex={animatedInputIndex}
            pinViewAnim={pinViewAnim}
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
            value={animatedInputIndex}
            placeholder="E"
            style={styles.input}
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
  },
  logoView: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  subtitle: {
    paddingTop: 32,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  input: {
    backgroundColor: "red",
    position: "absolute",
    right: -99,
    top: 24
  }
});
