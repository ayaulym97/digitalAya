import { createSwitchNavigator } from "react-navigation";
import AuthRoute from "./authRoute";
import AppRoute from "./appRoute";

import AuthLoadingScreen from "./AuthLoadingScreen";

import PinPassword from "../screens/app/pinPassword";
import CreatePin from "../screens/auth/createPin";

const applicationSwitch = createSwitchNavigator(
  {
    PinPassword: PinPassword,
    CreatePin: CreatePin,
    AuthLoadingScreen: AuthLoadingScreen,
    Auth: AuthRoute,
    App: AppRoute
  },
  {
    initialRouteName: "AuthLoadingScreen",
  }
);

export default applicationSwitch;
