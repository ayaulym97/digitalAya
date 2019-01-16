import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  PinPassword,
  SelectVedom,
  SelectCity,
  SelectDistrict,
  SelectServiceCenter,
  Estimate,
  WaitForResponse,
  WannaBeContacted,
  AfterEightPm,
  Called,
  Uncalled,
  Mtszn
} from "../screens/app";
import { Image,View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../uitls/theme";

const app = createStackNavigator(
  {
    PinPassword: {
      screen: PinPassword,
      navigationOptions: {
        header: null
      }
    },
    SelectVedom: {
      screen: SelectVedom,
      navigationOptions: {
        header: null
      }
    },
    Mtszn: {
      screen: Mtszn
    },
    SelectCity: {
      screen: SelectCity
    },
    SelectDistrict: {
      screen: SelectDistrict
    },
    SelectServiceCenter: {
      screen: SelectServiceCenter
    },
    Estimate: {
      screen: Estimate
    },
    WannaBeContacted: {
      screen: WannaBeContacted
    },
    AfterEightPm: {
      screen: AfterEightPm
    },
    WaitForResponse: {
      screen: WaitForResponse,
      navigationOptions: {
        headerLeft: null
      }
    },
    Called: {
      screen: Called,
      navigationOptions: {
        headerLeft: null
      }
    },
    Uncalled: {
      screen: Uncalled,
      navigationOptions: {
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: "SelectVedom",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Theme.colors.gray26,
        borderBottomWidth: 0
      },

      headerBackImage: (
        <Icon
          name={"ios-arrow-round-back"}
          size={32}
          color="white"
          style={{
            marginLeft: Platform.OS === "ios" ? 16 : 0
          }}
        />
      ),
      headerTitle: (
        <Image
          resizeMode={"contain"}
          style={{
            width: "0.186%",
            height: 20,
            flex: 1,
          }}
          source={require("../assets/logo.png")}
        />
      ),
      headerRight: <View style={{ height: 50, width: 50 }} />
    }
  }
);

export default app;
