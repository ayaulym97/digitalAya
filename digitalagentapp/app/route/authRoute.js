import { createStackNavigator } from 'react-navigation';
import { SignUpNew, CodeConfirm,CreatePin,RepeatPin } from '../screens/auth';
const auth = createStackNavigator(
  {
    SignUp: {
      screen: SignUpNew,
    },
    CodeConfirm: {
      screen: CodeConfirm,
    },
    CreatePin:{
      screen:CreatePin
    },
    RepeatPin:{
      screen:RepeatPin
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);
export default auth;