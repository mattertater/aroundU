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
                    
                    <Item style={styles.loginLogo}>
                        <Text>Logo</Text>
                    </Item>

                    <Item floatingLabel last style={styles.loginTextBox}>
                        <Label style={styles.loginText}>Username</Label>
                        <Input style={styles.loginText} value={this.state.email} onChangeText={email => this.setState({email})}/>
                    </Item>
                    
                    <Item floatingLabel last style={styles.loginTextBox}>
                        <Label style={styles.loginText}>Password</Label>
                        <Input style={styles.loginText} secureTextEntry={true} value={this.state.password} onChangeText={password => this.setState({password})} />
                    </Item>

                    <Item>
                        <Button rounded style={styles.loginButton} onPress={this._signInAsync.bind(this)} >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </Button>
                    </Item>

                    <Item>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Map')}}>
                            <Button rounded style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Map</Text>
                            </Button>
                        </TouchableOpacity>
                    </Item>
                </View>
            </Container>
        );
    }
}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
    },
    loginLogo: {
        maxWidth: 175,
        minWidth: 100,
    },
    loginButton: {
        marginTop: 20,
        minWidth: 150,
        justifyContent: 'center',
        backgroundColor: colors.green,
        borderBottomWidth: 0,
    },
    loginButtonText: {
        color: 'white',
    },
    loginTextBox: {
        minWidth: 250,
        marginTop: 20,
    },
    loginText: {
        color: 'white',
    }
  });

  export default SignInScreen;
