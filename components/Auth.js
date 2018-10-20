import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class AuthLoadingScreen extends React.Component {

    constructor() {
      super();
      this._bootstrapAsync();
      this.state = {
        loading: '',
        success: '',
        error: '',
      }
    }
    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };

    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'Map' : 'SignUp');
    };
  
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