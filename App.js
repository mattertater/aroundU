import React from 'react';
import { YellowBox } from 'react-native';
import { Root } from 'native-base';
import AuthLoadingScreen from './components/Auth.js';
import SignInScreen from './screens/SignIn.js';
import CreateAccountScreen from './screens/CreateAccount.js';
import ProfileCreationScreen from './screens/ProfileCreation.js';
import MyMap from "./screens/Map/index.js";
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
const SignUpStack = createStackNavigator({  // Sign up
  SignIn: SignInScreen,
  CreateAccount: CreateAccountScreen,
  ProfileCreation: ProfileCreationScreen,
});


const Switch = createSwitchNavigator({    // Switch between the two
    AuthLoading: AuthLoadingScreen, 
    SignUp: SignUpStack,
    Map: MyMap,
  }, 
  {
    initialRouteName: 'AuthLoading',
  }
);



export default () => (
  <Root>
    <Switch/>
  </Root>
)