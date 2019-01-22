import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //passwordInputView
  passwordInputView: {
    paddingTop:25,
    flexDirection: "row",
    alignSelf: "center"
  },
  passwordInputViewItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    margin: 5,
    width: 35,
    borderRadius: 35 / 2
  },
  passwordInputViewItemActive: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 35 / 2
  },
  // KeyboardView
  keyboardView: {
    alignItems: "center",
    marginTop: 20
  },
  keyboardViewItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 40
  },
  keyboardViewItemText: {
    fontSize: 32
    
  }
});
