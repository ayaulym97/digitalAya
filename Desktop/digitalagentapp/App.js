import React, { PureComponent } from "react";
import { AsyncStorage } from "react-native";
import root from "./app/route";
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onboarding: "false"
    };
  }
  async componentDidMount() {
    await AsyncStorage.removeItem("id_token");
    try {
      const item = await AsyncStorage.getItem("onboarding");
      console.log("####", item);
      if (item === null || item === "false") {
        this.setState({ onboarding: "false" });
      } else {
        await AsyncStorage.setItem("onboarding", "true");
        this.setState({ onboarding: "true" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    const { onboarding } = this.state;
    const Layout = root(onboarding);
    return <Layout />;
  }
}
//original
