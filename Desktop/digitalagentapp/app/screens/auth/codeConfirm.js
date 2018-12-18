import React, { Component } from 'react';
import { View,Image, Text,TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import CodeInput from 'react-native-confirmation-code-input';
import { Button,LogoView,Footer } from '../../components';
import { Theme } from '../../uitls/theme';
import { StylePanel } from "../../uitls/styles";
import deviceStorage from '../../service/deviceStorage';
import {  base_url} from "../../config/const";
export default class CodeConfirm extends Component {
  state={
    code:0,
  }
  userId = this.props.navigation.getParam('data', 'default');
  phone = this.props.navigation.getParam('phone', 'default');

  handleCode=(code)=>{
    this.setState({
      code
    })
  }
  sendCode() {
    const { code } = this.state;
    console.log("CODECCONFIRM",code,this.userId,this.phone)
    axios.post(base_url+"/api/auth/checksms",{
        user_id: this.userId,
        code:code
    },)
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.token);
      console.log("ID_TOKEN",response.data.token)
      this.props.navigation.navigate('App');
    })
    .catch((error) => {
      console.log(error);
    });
  }
  resendCode() {
    axios.post(base_url+"/api/auth/resendcode/"+this.userId)
    .then((response) => {
      console.log("TOKEN",response.data)
    })
    .catch((error) => {
      console.log(error);
      
    });
  }

  render() {
    return (
      <View style={StylePanel.container} >
         <LogoView logostyle={styles.logoView}/>
        <View style={styles.downView}>
          <Text style={styles.header}>Введите SMS код</Text>
          <Text style={styles.codeSendTxt}>
            Код отправлен на номер:
             {this.phone}
          </Text>
          <CodeInput
            keyboardType="numeric"
            className={'border-b'}
            activeColor={Theme.colors.yellow}
            inactiveColor={Theme.colors.gray74}
            codeLength={4}
            space={16}
            size={33}
            codeInputStyle={{ fontSize: 28,    fontWeight: '100',}}
            inputPosition="center"
            onFulfill={code => this.handleCode(code)}
          />
          <View style={{flex:4,}}>
          <TouchableOpacity style={styles.repeatBtn} onPress={()=>this.resendCode()}>
          
          <Text style={styles.repeatTxt}>
              Повторно отправить SMS
          </Text>
          <Image 
            resizeMode={'contain'} 
            style={{width:"56%",marginHorizontal:"22%"}} 
            source={require("../../assets/line.png")} />
       
   
          </TouchableOpacity>
         
          <Button text={'Отправить'} sendBtn={styles.sendBtn} onPress={() => this.sendCode()} />
          </View>
         
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  downView: {
    flex: 6,
  },
  logoView: {
    flex:1.5,
    alignContent: 'center',
    paddingTop:35,
   
  },
  header: {
    width: '100%',
    textAlign: 'center',
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h1,
    paddingTop: 35,
    paddingBottom: 10,
    fontWeight: '100',
  },
  codeSendTxt: {
    width: '50%',
    color: 'white',
    textAlign: 'center',
    fontSize: Theme.fonts.sizes.p4,
    marginHorizontal: '25%',
    marginTop:6
  },
  repeatBtn:{
   marginBottom:20
  },
  repeatTxt:{
    width: '100%',
    textAlign: 'center',
    paddingTop:10,
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6
  },
  sendBtn: {
    width: '80%',
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: '10%',
    marginVertical:10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  footerStyle:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upText: {
    color:Theme.colors.gray42,
    fontSize: Theme.fonts.sizes.p3
  },
});