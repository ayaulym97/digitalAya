import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { StylePanel } from "../uitls/styles";
import { Theme } from "../uitls/theme";
import { Button, IntroPage, Footer } from "../components";
import { scale } from "../uitls/index";
import deviceStorage from "../service/deviceStorage";
import { LogoView } from "../components";
export default class AppIntro extends React.Component {
  state = {
    index: 0
  };
  swiper = null;

  swipe = () => {
    const { index } = this.state;
    this.swiper.scrollBy(1);
    if (index === 2) {
      this.onBoard();
      this.props.navigation.navigate("ApplicationSwitch");
    } else {
      this.setState({
        index: index + 1
      });
    }
  };
  onIndexChanged = index => {
    this.setState({
      index
    });
  };

  onBoard = async () => {
    try {
      deviceStorage.saveKey("onboarding", "true");
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.upView}>
          <Swiper
            loop={false}
            showsButtons={false}
            ref={swiper => {
              this.swiper = swiper;
            }}
            dot={<View style={[styles.dotStyle, styles.passive]} />}
            activeDot={<View style={[styles.dotStyle, styles.active]} />}
            onIndexChanged={index => this.onIndexChanged(index)}
          >
            <IntroPage
              img={require("../assets/onboardIconOne.png")}
              header="Организация"
              txt="Выберите город и организацию, которую хотите оценить."
            />
            <IntroPage
              img={require("../assets/onboardIconTwo.png")}
              header="Оценка"
              txt="Оцените качество обслуживания и оставьте комментарий или жалобу."
            />
            <IntroPage
              img={require("../assets/onboardIconThree.png")}
              header="Звонок"
              txt="Дождитесь обратной связи в течение 
              5 минут и получите решение."
            />
          </Swiper>
        </View>
        <View style={[StylePanel.xyCenter, { flex: 1 }]}>
          {this.state.index === 2 ? (
            <TouchableOpacity
              style={[
                StylePanel.defaultBtn,
                { backgroundColor: Theme.colors.green }
              ]}
              onPress={() => this.swipe()}
            >
              <Text style={styles.sendBtnTxt}>Приступить</Text>
            </TouchableOpacity>
          ) : (
            <Button
              text="Далее"
              onPress={() => this.swipe()}
              sendBtn={[
                StylePanel.defaultBtn,
                { backgroundColor: Theme.colors.yellow }
              ]}
            />
          )}
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upView: {
    flex: 7
  },
  logoView: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center"
  },
  passive: {
    backgroundColor: "#444444"
  },
  active: {
    backgroundColor: "white"
  },
  dotStyle: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(5),
    marginHorizontal: scale(6),
    marginTop: scale(5)
  },
  sendBtnTxt: {
    color: "white",
    fontSize: Theme.fonts.sizes.p6
  }
});
