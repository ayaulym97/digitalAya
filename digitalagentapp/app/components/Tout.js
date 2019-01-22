import React, { PureComponent } from "react";
import {
  Animated,
  AsyncStorage,
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../uitls/theme";
import { StylePanel } from "../uitls/styles";

class Tout extends PureComponent {
  state = {
    toutSubcategoriesVisible: false //true when we the tout has been clicked on and subcategory items are exposed
  };

  handlePressTout = item => {
    const isActive = this.props.activeTab === this.props.toutIndex;
    console.log("TOUT", isActive, this.props.activeTab, this.props.toutIndex);
    this.props.handleDistricts();

    this.setState(prevState => {
      return {
        ...prevState,
        toutSubcategoriesVisible: !this.state.toutSubcategoriesVisible
      };
    });
  };
  setToutRef = node => {
    //store a reference to the tout so we can measure it
    if (node) {
      this.toutRef = node;
    }
  };

  render() {
    let categoryLinks;

    if (this.props.cons && this.props.cons.length) {
      categoryLinks = (
        <Animated.View>
          {this.props.cons.map(item => {
            return (
              <TouchableOpacity
                key={item._id}
                style={styles.advancedcityContainer}
                onPress={() =>
                  this.props.navigation.navigate("Estimate", {
                    cons: item,
                    vedom: this.vedom
                  })
                }
              >
                <View style={styles.content}>
                  <Text style={styles.cityTxt}>{item.name}</Text>
                  {this.vedom === "con" ? null : (
                    <Text style={styles.addressTxt}>{item.address}</Text>
                  )}
                </View>
                <Icon
                  name={"ios-arrow-forward"}
                  size={24}
                  color={Theme.colors.gray63}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      );
    } else {
      categoryLinks = null;
    }

    return (
      <View
        style={this.props.toutIndex === 0 ? { marginTop: 0 } : { marginTop: 5 }} //if this is the first tout, no margin is needed at top
        //  onLayout={!this.measurements.pageY ? this.measureToutRef : () => null} //if we already have measurements for this tout, no need to render them again. Otherwise, get the measurements
      >
        <TouchableOpacity
          style={styles.cityContainer}
          ref={this.setToutRef}
          onPress={() =>
            this.handlePressTout(this.props.item, this.props.toutIndex)
          }
        >
          <Text
            style={StylePanel.cityTxt} //text is wrapped by image so it can be easily centered
          >
            {this.props.item.name}
          </Text>
        </TouchableOpacity>
        {//this.state.toutSubcategoriesVisible &&this.props.activeTab === this.props.toutIndex &&
        this.props.isOpenTab && categoryLinks}
      </View>
    );
  }
}
export default withNavigation(Tout);

const styles = StyleSheet.create({
  cityContainer: {
    width: "92%",
    marginHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  upView: {
    flex: 1
  },
  advancedcityContainer: {
    width: "92%",
    marginHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  cityTxt: {
    color: "white",
    fontWeight: "500",
    fontSize: Theme.fonts.sizes.p6
  },
  addressTxt: {
    paddingTop: 10,
    color: "#727272",
    fontSize: Theme.fonts.sizes.p4
  },
  content: {
    width: "95%"
  }
});
