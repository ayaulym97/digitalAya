import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Easing,
  StyleSheet,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Footer } from "../../components";
import { Theme } from "../../uitls/theme";
import { base_url } from "../../config/const";
import { StylePanel } from "../../uitls/styles";
export default class WaitForResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: 5,
      seconds: 0,
      fill: 0,
      solved: false
    };
  }
  componentDidMount() {
    this.circularProgress.animate(100, 300000, Easing.quad);
    var time_in_minutes = 5;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes * 60 * 1000);
    console.log(deadline, "DDAY");
    this.run_clock(deadline);
  }
  review = this.props.navigation.getParam("review", "default");
  run_clock = deadline => {
    clearInterval(timeinterval);
    var timeinterval = setInterval(() => {
      var t = Date.parse(deadline) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      if (seconds >= 0 && minutes >= 0) {
        this.setState({
          minute: minutes,
          seconds: seconds
        });
      }
    }, 1000);
  };

  handleUncalled = () => {
    this.postAdgs();
    this.props.navigation.navigate("Uncalled");
  };
  async postAdgs() {
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN_ADGS", token);
    axios
      .post(
        base_url + "/api/review/sendtoadgs/" + this.review,
        {},
        { headers: { Authorization: token } }
      )
      .then(response => {
        console.log("61", response);
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={styles.upView}>
          <AnimatedCircularProgress
            style={{ marginTop: 30, marginHorizontal: "15%" }}
            ref={ref => (this.circularProgress = ref)}
            size={250}
            width={18}
            rotation={0}
            fill={this.state.fill}
            tintColor={Theme.colors.yellow}
            backgroundColor={Theme.colors.gray26}
          >
            {() => (
              <Text style={styles.timeTxt}>
                0{this.state.minute}:{this.state.seconds < 10 ? 0 : null}
                {this.state.seconds}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.downView}>
          {this.state.seconds === 0 && this.state.minute === 0 ? (
            <View styles={styles.subDownView}>
              {this.state.solved ? (
                <React.Fragment>
                  <Text style={styles.subDownTxt}>Решили вопрос?</Text>
                  <View
                    style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                  >
                    <TouchableOpacity
                      style={styles.sendBtnYes}
                      onPress={() => this.props.navigation.navigate("Called")}
                    >
                      <Text style={styles.sendBtnTxtYes}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sendBtnNo}
                      onPress={() => this.handleUncalled()}
                    >
                      <Text style={styles.sendBtnTxtNo}>Нет</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text style={styles.subDownTxt}>Вам позвонили?</Text>
                  <View
                    style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                  >
                    <TouchableOpacity
                      style={styles.sendBtnYes}
                      onPress={() => this.setState({ solved: true })}
                    >
                      <Text style={styles.sendBtnTxtYes}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sendBtnNo}
                      onPress={() => this.handleUncalled()}
                    >
                      <Text style={styles.sendBtnTxtNo}>Нет</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
            </View>
          ) : (
            <View styles={styles.subDownView}>
              <Text style={styles.subDownTxt}>Ваша жалоба принята!</Text>
              <Text style={styles.waitTxt}>
                Дождитесь 5 минут, чтобы получить ответ от представителей ЦОНа.
              </Text>
            </View>
          )}
        </View>
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  upView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  downView: {
    flex: 1,
    paddingTop: 60
  },
  subDownView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  footerStyle: {
    position: "absolute",
    bottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "5%"
  },
  timeTxt: {
    fontSize: 36,
    color: Theme.colors.yellow,
    fontWeight: "200"
  },
  subDownTxt: {
    fontSize: 26,
    textAlign: "center",
    color: Theme.colors.yellow,
    width: "90%",
    marginHorizontal: "5%",
    fontWeight: "100"
  },
  waitTxt: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20
  },
  sendBtnYes: {
    width: "40%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnNo: {
    width: "40%",
    height: 45,
    borderColor: Theme.colors.yellow,
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnTxtYes: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
