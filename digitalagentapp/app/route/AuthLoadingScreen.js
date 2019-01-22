
import React from "react";
import { AsyncStorage,StyleSheet,View } from "react-native";
import {Theme} from "../uitls/theme";
export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      const item = await AsyncStorage.getItem("id_token");
      this.props.navigation.navigate(item ? "App" : "Auth");
    } catch (error) { 
      console.log(error.message);
    }
  };
  render() {
    return (
         <View style={styles.container}/> 
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:Theme.colors.bcground,
    },
});