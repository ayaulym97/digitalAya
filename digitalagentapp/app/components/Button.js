import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../uitls/theme';
const Button = ({ disable, onPress, sendBtn, text }) => {
  return (
    <TouchableOpacity disabled={disable} style={sendBtn} onPress={onPress}>
      <Text style={styles.sendBtnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  sendBtnTxt: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: 'center',
  },
});
export default Button;