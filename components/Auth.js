import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from '../config/Firebase.js'

class AuthLoadingScreen extends React.Component {

    constructor() {
      super();
      this.state = {
        loading: '',
        success: '',
        error: '',
        isFontReady: false,
      }
    }
    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };

    async componentWillMount() {
      try {
        Expo.Font.loadAsync({
          'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      }).then(async (response) => {
          const userToken = await AsyncStorage.getItem('userToken');
          this.props.navigation.navigate(userToken ? 'Map' : 'SignUp');
        })
      } catch (error) {
        console.log('error loading icon fonts', error);
      }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            AsyncStorage.setItem('userToken', 'success');
            this.props.navigation.navigate('AuthLoading'); 
          } else {
            console.log('no token');
          }
            
            
          })
      }
    
  
    render() {
      return (
        <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <ActivityIndicator/>
          <StatusBar barStyle="light-content" />
        </View>
      );
    }
  }

  export default withNavigation(AuthLoadingScreen);