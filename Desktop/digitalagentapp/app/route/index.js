import { createSwitchNavigator } from "react-navigation";
import AppIntro from "./AppIntro";
import applicationSwitch from "./ApplicationSwitch";
const root = (onboarding = "false") => {
  return createSwitchNavigator(
    {
      AppIntro: {
        screen: AppIntro
      },
      ApplicationSwitch: {
        screen: applicationSwitch
      }
    },
    {
      initialRouteName: onboarding === "true" ? "ApplicationSwitch" : "AppIntro"
    }
  );
};
export default root;