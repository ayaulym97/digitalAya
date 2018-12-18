import {Theme} from "./theme"
import {Platform} from "react-native"
import { scaleVertical } from ".";
export const StylePanel = {
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground,
    paddingTop: Platform.OS === 'ios' ? 20 : 24
  },
  xyCenter:{
    justifyContent: 'center',
    alignContent: 'center',
  },
  borrderRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.bcground,
    borderBottomColor: Theme.colors.bcground,
    borderBottomWidth: 0.5,
    paddingTop: Platform.OS === 'ios' ? 10 : 24
  },
  footerStyle:{
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%"
  },
  absBottom:{
    position:"absolute",
    bottom:20
  },
  //selectClasses
  selectContainer: {
    flex: 1,
    backgroundColor: Theme.colors.bcground,
    paddingTop: 16
  },
  upView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical:10
  },
  downView: {
    flex: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  searchBarInput:{
    backgroundColor: Theme.colors.bcground,
    borderColor: Theme.colors.gray42,
    borderWidth:1
  },
  header: {
    width: '92%',
    fontSize: Theme.fonts.sizes.h2,
    marginHorizontal: '4%',
    color: Theme.colors.yellow,
    marginVertical:scaleVertical(24),
    fontWeight: '100'
  },
  searchBarContainer:{
    backgroundColor: Theme.colors.bcground,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingVertical:15,
  },
  cityContainer:{
    width: '92%',
    marginHorizontal: '4%',
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:12,
    borderBottomWidth:1,
    borderBottomColor:Theme.colors.gray42
  },
  cityTxt: {
    
    color: 'white',
    fontSize: Theme.fonts.sizes.p6,
  },
  //Button.js
  sendBtn: {
    width: '92%',
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: '4%',
    marginVertical:10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  defaultBtn: {
    height: 45,
    width: '80%',
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
};