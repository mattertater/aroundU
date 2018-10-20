import React from 'react';
import { Root } from 'native-base';
import AuthLoadingScreen from './components/Auth.js';

import SignInScreen from './screens/SignIn.js';
import MyMap from "./screens/Map/index.js";
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';


const SignUpStack = createStackNavigator({  // Sign up
  SignIn: SignInScreen,
  CreateAccount: CreateAccountScreen,
});


const Switch = createSwitchNavigator({    // Switch between the two
    AuthLoading: AuthLoadingScreen, 
    SignUp: SignUpStack,
    Map: MyMap,
  }, 
  {
    initialRouteName: 'AuthLoading' 
  }
);



export default () => (
  <Root>
    <Switch/>
  </Root>
)