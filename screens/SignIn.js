import React from 'react';
import {
    StatusBar,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
} from 'react-native';

import AuthLoadingScreen from '../components/Auth.js';
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider,  Button, Toast } from 'native-base';
import Common from '../native-base-theme/variables/commonColor';
import getTheme from '../native-base-theme/components';
// import firebase from '../config/Firebase.js'

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          email: '',
          password: '',
          success: '',
          showToast: false,
          isFontReady:true,
        };
      }

    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };
    
    componentDidMount() {
        Expo.Font.loadAsync({
            'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({isFontReady:true})
      }

    // _signInAsync = async () => {
    // const { email, password } = this.state;
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //                 .then(() => { AsyncStorage.setItem('userToken', 'success');
    //                                 this.props.navigation.navigate('AuthLoading'); 
    //                             })
    //                 .catch(() => {
    //                     <AuthLoadingScreen error='Authentication failed' loading={false} success=''/>
    //                     Toast.show({
    //                         style: {
    //                             backgroundColor: "#6D6ABF",
    //                             borderRadius: 15,
    //                         },
    //                         text: "Email or password is inccorect. Try again.",
    //                         buttonText: "Got it",
    //                         duration: 3000,
    //                         position: 'bottom',
    //                     })
    //                     });
    // };

    render(){
        if (!this.state.isFontReady) {
            return <Expo.AppLoading />;
          }
        return(
            <StyleProvider style={getTheme(Common)}>
                <Container>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Map')}}>
                    <View style={{width: 75, height: 75, borderRadius: 75/2.0, backgroundColor: 'blue'}}>
                    </View>
                </TouchableOpacity>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({

  });

  export default SignInScreen;