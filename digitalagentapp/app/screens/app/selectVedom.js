import React, { Component } from "react";
import { View, Text, Image,Platform, TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "../../uitls/index";
import { Theme } from "../../uitls/theme";
import { StylePanel } from "../../uitls/styles";
import { Footer, LogoView } from "../../components";
export default class SelectVedom extends Component {
  chooseVedom = vedom => {
    console.log(vedom,"VEDOM")
    this.props.navigation.navigate("SelectCity", { vedom: vedom });
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.mainView}>
          <Text style={styles.header}>Выберите ведомство</Text>
      
          <TouchableOpacity
            style={styles.vedom}
            onPress={() => this.chooseVedom("con")}
          >
            <Image
              style={styles.vedomIcon}
              source={require("../../assets/university.png")}
            />
            <Text style={styles.vedomText}>ЦОНы</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vedom}
            onPress={() => this.chooseVedom("kgd")}
          >
            <Image
              style={styles.vedomIcon}
              source={require("../../assets/bank.png")}
            />
            <Text style={styles.vedomText}>Министерство финансов</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vedom}
            onPress={() => this.props.navigation.navigate("Mtszn",{vedom:"mtszn"})}
          //  onPress={() => this.chooseVedom("mtszn")}
          >
            <Image
              style={styles.vedomIcon}
              source={require("../../assets/businessman.png")}
            />
            <Text style={styles.vedomText}>
              Министерство труда и социальной защиты
            </Text>
          </TouchableOpacity>
        </View>

        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 95
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  mainView: {
    flex: 4
  },
  header: {
    textAlign: "center",
    fontSize: Theme.fonts.sizes.h2,
    color: Theme.colors.yellow,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100",
    marginBottom: 32
  },
  vedom: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: 10,
    backgroundColor: Theme.colors.gray26
  },
  vedomIcon: {
    width: 22,
    height: 22,
    margin: 14
  },
  vedomText: {
    width:"85%",
    color: "white",
    fontSize: Theme.fonts.sizes.p5
  }
});
