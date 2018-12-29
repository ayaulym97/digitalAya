import { createSwitchNavigator } from "react-navigation";
import AuthRoute from "./authRoute";
import AppRoute from "./appRoute";
import AuthLoadingScreen from "./AuthLoadingScreen";

const applicationSwitch = createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    Auth: AuthRoute,
    App: AppRoute
  },
  {
    initialRouteName: "AuthLoadingScreen"
  }
);

export default applicationSwitch;
