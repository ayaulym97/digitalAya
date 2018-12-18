import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Theme } from '../../uitls/theme';
import { StylePanel } from '../../uitls/styles';
import { Footer, Button } from '../../components';
export default class AfterEightPm extends Component {
  handlePress = () => {
    this.props.navigation.navigate('SelectCity');
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={require('../../assets/workhour.png')}
        />
        <View style={styles.txtView}>
          <Text style={styles.title}>
            Спасибо, Ваша заявка принята, с Вами обязательно свяжутся в течение
            рабочего времени
          </Text>
        </View>

        <Button
          text={'Вернуться'}
          sendBtn={StylePanel.sendBtn}
          onPress={() => this.handlePress()}
        />
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footerStyle: {
    height: 45,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.bcground,
  },
  txtView: {
    flex: 1,
    marginHorizontal: '5%',
  },
  image: {
    width:220,
    height:193,
  },
  title: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.yellow,
    textAlign: 'center',
    fontWeight: '100',
    marginTop: 15,
  },
});