import React from 'react';
import { Root } from 'native-base';
import AuthLoadingScreen from './components/Auth.js';
import MapScreen from './screens/Map.js'
import SignInScreen from './screens/SignIn.js';
import CreateAccountScreen from './screens/CreateAccount.js';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const SignUpStack = createStackNavigator({  // Sign up
  SignIn: SignInScreen,
  CreateAccount: CreateAccountScreen,
});


const Switch = createSwitchNavigator({    // Switch between the two
  AuthLoading: AuthLoadingScreen, 
  SignUp: SignUpStack,
  Map: MapScreen,
}, 

{
  initialRouteName: 'AuthLoading' 
});




export default () => (
  <Root>
    <Switch/>
  </Root>
)