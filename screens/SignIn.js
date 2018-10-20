import React from 'react';
import {
    StatusBar,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Text,
    AsyncStorage,
} from 'react-native';

import AuthLoadingScreen from '../components/Auth.js';
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider, Button, Toast } from 'native-base';
import Common from '../native-base-theme/variables/commonColor';
import getTheme from '../native-base-theme/components';
import firebase from '../config/Firebase.js'
import colors from '../config/Colors.js'

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
          isFontReady:false,
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

    _signInAsync = async () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => { AsyncStorage.setItem('userToken', 'success');
                                    this.props.navigation.navigate('AuthLoading'); 
                                })
                    .catch(() => {
                        <AuthLoadingScreen error='Authentication failed' loading={false} success=''/>
                        Toast.show({
                            style: {
                                backgroundColor: "#000000",
                                borderRadius: 15,
                            },
                            text: "Email or password is inccorect. Try again.",
                            buttonText: "Got it",
                            duration: 3000,
                            position: 'bottom',
                        })
                        });
    };

    render(){
        if (!this.state.isFontReady) {
            return <Expo.AppLoading />;
          } 
        return(
            <Container>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    
                    <Item style={styles.noUnderline}>
                        <Image source={require('../assets/images/logo.png')} style={styles.loginLogo}></Image>
                    </Item>

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Email' placeholderTextColor='white' value={this.state.email} onChangeText={email => this.setState({email})}/>
                    </Item>
                    
                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Password' placeholderTextColor='white' secureTextEntry={true} value={this.state.password} onChangeText={password => this.setState({password})}/>
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button rounded style={styles.loginButton} onPress={this._signInAsync.bind(this)}>
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </Button>
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button onPress={() => {this.props.navigation.navigate('CreateAccount')}} rounded style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Create Account</Text>
                        </Button>
                    </Item>
                </View>
            </Container>
        );
    }
}
  const styles = StyleSheet.create({
    noUnderline: {
        borderColor: 'transparent',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
    },
    loginLogo: {
        width: 250,
        height: 250,
    },
    loginButton: {
        marginTop: 20,
        width: 150,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        borderColor: 'transparent',
    },
    loginButtonText: {
        color: colors.black,
    },
    loginTextBox: {
        minWidth: 250,
    },
    loginText: {
        color: colors.white,
    }
  });



  export default SignInScreen;
