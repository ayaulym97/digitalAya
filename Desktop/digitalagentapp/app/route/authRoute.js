import { createStackNavigator } from 'react-navigation';
import { SignUp, CodeConfirm,CreatePin } from '../screens/auth';
const auth = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
    },
    CodeConfirm: {
      screen: CodeConfirm,
    },
    CreatePin:{
      screen:CreatePin
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);
export default auth;