import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { scale } from '../../uitls/index';
import { Theme } from '../../uitls/theme';
import { StylePanel } from '../../uitls/styles';
import { Footer, Button, IntroPage } from '../../components';
export default class Uncalled extends Component {
  handlePress = () => {
    this.props.navigation.navigate('SelectCity');
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={styles.slide}>
        
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={require('../../assets/adgsIcon.png')}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop:45,
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Спасибо!</Text>
          <Text style={styles.subTitle}>
            Ваша жалоба отправлена в Агентство Республики Казахстан по делам
            государственной службы и противодействию коррупции (АДГСПК РК) !
            Результат Вашей жалобы будет известен после проверки ЦОНа.
          </Text>
        </View>
        <Button
          text={'Вернуться на главную'}
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
  slide: {
    flex: 1,
    paddingTop:36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(90 * 2.5),
    height: scale(80 * 2.5),
  },
  text: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.yellow,
    textAlign: 'center',
    fontWeight: '100',
    
  },
  subTitle:{
    marginTop:16,
    fontSize: scale(13),
    color: "white",
    textAlign: 'center',
    width:"98%",
    marginHorizontal:14
  }
});
