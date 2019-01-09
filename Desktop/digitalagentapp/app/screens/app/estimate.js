import React, { Component } from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
// import CustomIcon from "../../components/CustomIcon"
import { base_url } from "../../config/const";
import { Theme } from "../../uitls/theme";
import { Button, Complaint, Footer } from "../../components";
import { StylePanel } from "../../uitls/styles";
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
};
export default class Estimate extends Component {
  state = {
    modalVisible: false,
    selectedStar: 0,
    imgUrl: "",
    staffIncompetence: false,
    waitTime: false,
    terribleWaitRoom: false,
    invalid: false,
    complaint: [],
    comment: ""
  };

  cons = this.props.navigation.getParam("cons", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  //ratingstar
  handleStar = selectedStar => {
    this.setState({
      selectedStar
    });
  };
  handleSendBtn = () => {
    this.postReview();
  };
  async postReview() {
    const { selectedStar, imgUrl, comment, complaint } = this.state;
    const token = await AsyncStorage.getItem("id_token");
    const user_id = await AsyncStorage.getItem("user_id");
    console.log("USER_ID", user_id, "TOKEN_REVIEW", token);
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    axios
      .post(
        base_url + "/api/review/add",
        {
          user_id: user_id,
          con_id: this.cons._id,
          rating: selectedStar,
          photos: [imgUrl],
          complaints: complaint,
          comment: comment,
          to: this.vedom
        },
        { headers: { Authorization: token } }
      )
      .then(response => {
        console.log(response.data, "REVIEW78");
        this.setState({
          review_id: response.data._id
        });

        if (currentHour >= 8 && currentHour <= 20) {
          if (this.state.selectedStar === 5) {
            this.props.navigation.navigate("Called");
          } else if (this.state.selectedStar === 4) {
            this.props.navigation.navigate("WannaBeContacted", {
              review: this.state.review_id
            });
          } else {
            this.props.navigation.navigate("WaitForResponse", {
              review: this.state.review_id
            });
          }
        } else {
          this.props.navigation.navigate("AfterEightPm");
        }
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  //takePhoto
  chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        let source = { uri: response.uri };
        let formData = new FormData();
        formData.append("file", {
          uri: source,
          name: "image.png",
          type: "image/jpeg"
        });

        axios
          .post(base_url + "/upload/image", formData)
          .then(response => {
            this.setState({
              imgUrl: response.data.data.url
            });
            console.log(this.state.imgUrl, 173);
          })
          .catch(err => {
            console.log(err.response, 165);
          });
      }
    });
  };
  ///checkbox

  checkBoxPress = (type, value) => {
    switch (value) {
      case "Некомпетентность персонала":
        this.setState({
          staffIncompetence: !this.state.staffIncompetence
        });
        //P.S здесь должно было === но так как когда нажимаешь он еще false
        if (this.state.staffIncompetence != true) {
          this.state.complaint.push(value);
        } else {
          this.state.complaint.splice(
            this.state.complaint.findIndex(e => e === value),
            1
          );
        }
        break;

      case "Время ожидания в очереди":
        this.setState({
          waitTime: !this.state.waitTime
        });
        if (this.state.waitTime != true) {
          this.state.complaint.push(value);
        } else {
          this.state.complaint.splice(
            this.state.complaint.findIndex(e => e === value),
            1
          );
        }
        break;
      case "Ужасные условия в зале ожидания":
        this.setState({
          terribleWaitRoom: !this.state.terribleWaitRoom
        });
        if (this.state.terribleWaitRoom != true) {
          this.state.complaint.push(value);
        } else {
          this.state.complaint.splice(
            this.state.complaint.findIndex(e => e === value),
            1
          );
        }

        break;
      case "Отсутствие условий для инвалидов":
        this.setState({
          invalid: !this.state.invalid
        });
        if (this.state.invalid != true) {
          this.state.complaint.push(value);
        } else {
          this.state.complaint.splice(
            this.state.complaint.findIndex(e => e === value),
            1
          );
        }
        break;
      default:
        break;
    }
    console.log("complaint", this.state.complaint);
  };

  render() {
    console.log("VVVV", this.vedom,this.cons);
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
            <View style={styles.headerView}>
              <Text style={styles.header}>Оцените ЦОН</Text>
     
              <Text style={styles.subHeader}>{this.cons.name}</Text>
              <StarRating
                maxStars={5}
                rating={this.state.selectedStar}
                starSize={35}
                containerStyle={styles.starContainer}
                fullStarColor={Theme.colors.yellow}
                emptyStarColor={Theme.colors.yellow}
                selectedStar={selectedStar => this.handleStar(selectedStar)}
              />
            </View>

            <View style={styles.contentView}>
              {this.state.selectedStar != 0 ? (
                <React.Fragment>
                  <React.Fragment>
                    {this.state.selectedStar === 5 ? (
                      <Text style={styles.complaintHeader}>
                        Что понравилось?
                      </Text>
                    ) : (
                      <Text style={styles.complaintHeader}>
                        {this.state.selectedStar < 4
                          ? "Что именно разочаровало?"
                          : "Что именно не понравилось?"}
                      </Text>
                    )}
                  </React.Fragment>

                  <Complaint
                    selectedStar={this.state.selectedStar}
                    staffIncompetence={this.state.staffIncompetence}
                    waitTime={this.state.waitTime}
                    terribleWaitRoom={this.state.terribleWaitRoom}
                    invalid={this.state.invalid}
                    checkBoxPress={(type, value) =>
                      this.checkBoxPress(type, value)
                    }
                  />
                </React.Fragment>
              ) : null}
              <Text style={styles.commentTxt}>Комментарий</Text>
              <View style={styles.commentContainer}>
                <TextInput
                  style={styles.commentInput}
                  multiline={true}
                  placeholder={"Ваше мнение"}
                  placeholderTextColor={Theme.colors.gray63}
                  onChangeText={comment => this.setState({ comment })}
                  value={this.state.comment}
                />
              </View>

              <TouchableOpacity
                style={styles.takePhoto}
                onPress={() => this.chooseImage()}
              >
                {this.state.imgUrl != "" ? (
                  <React.Fragment>
                    {this.state.imgUrl != "" ? (
                      <Image
                        source={{ uri: this.state.imgUrl }}
                        style={{ flex: 1 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color={Theme.colors.yellow}
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <Icon
                    name="ios-camera"
                    size={35}
                    color={Theme.colors.yellow}
                    style={{
                      paddingRight: 16
                    }}
                  />
                )}
                <Text style={styles.takePhotoTxt}>Прикрепите фотографию</Text>
              </TouchableOpacity>
              <Button
                disable={this.state.selectedStar === 0}
                text={"Отправить"}
                sendBtn={StylePanel.sendBtn}
                onPress={() => this.handleSendBtn()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Footer footerStyle={[StylePanel.footerStyle]} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  headerView: {
    flex: 1
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h1,
    marginTop: 25,
    fontWeight: "100"
  },
  subHeader: {
    width: "92%",
    color: "white",
    textAlign: "center",
    marginHorizontal: "4%",
    fontSize: Theme.fonts.sizes.p5,
    marginTop: 10
  },
  starContainer: {
    marginVertical: 20,
    width: "60%",
    marginHorizontal: "20%"
  },
  contentView: {
    flex: 2,
    backgroundColor: Theme.colors.checkboxGray,
    marginHorizontal: "4%"
  },
  commentTxt: {
     width: "90%",
    marginHorizontal: "4%",
    color: Theme.colors.gray63,
    fontSize: Theme.fonts.sizes.p6,
    marginTop: 16,
    marginBottom:10
  },
  takePhotoTxt:{
    marginVertical:24,
    color: "white",
    fontSize: Theme.fonts.sizes.p6
  },
  commentInput: {
    flex: 1,
    color: "white",
    marginBottom: 10,
    fontSize: Theme.fonts.sizes.p6
  },
  commentContainer: {
    height: 80,
    backgroundColor: Theme.colors.bcground,
    paddingLeft: 10,
    marginHorizontal: "4%",
    borderColor: Theme.colors.gray63,
    borderWidth: 1,
    marginBottom: 5
  },
  takePhoto: {
    // width: 50,
    // height: 50,
    // marginLeft: "4%",
    marginHorizontal: "4%",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center"
    // borderColor: Theme.colors.gray63,
    // borderWidth: 1,
    // borderRadius: 5
  },
  complaintHeader: {
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h6,
    fontWeight: "100",
    marginTop: 24,
    marginBottom:14
  }
});
