import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export class Accordion extends Component {
  constructor(props) {
    super(props);
    this.icons = {
      open: 'triangle-down',
      close: 'triangle-up',
    };

    this.state = { expanded: false };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    let icon = this.icons['open'];
    if (this.state.expanded) {
      icon = this.icons['close'];
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.toggle.bind(this)}
          underlayColor={'red'}>
          {this.props.Header}
        </TouchableOpacity>
        <ScrollView>
          {this.state.expanded && (
            <ScrollView style={styles.body}>{this.props.children}</ScrollView>
          )}
        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
