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
          confirmPassword: '',
          success: '',
          showToast: false,
        };
      }

    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };

    verifyValidCredentials = () => {
        console.log('validating credentials');
        const { email, password, confirmPassword } = this.state;
        if(password.length > 5 && password === confirmPassword){
            this.setState({email:email, password: password, confirmPassword: confirmPassword});
            console.log('credentials are valid');
            this.handleSignUp();
        }
        else{
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
        }
    }

    handleSignUp = () => {
        console.log('handling sign up');
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email.trim(),  password)
          .then(() => {
            console.log('success');
            this.props.navigation.navigate('Map');
          }).catch(error => {
            console.log(error.message); 
          });
    }

    render(){
        return(
            <Container>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Email' placeholderTextColor='white' value={this.state.email} onChangeText={email => this.setState({email})}/>
                    </Item>
                    
                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Password' placeholderTextColor='white' secureTextEntry={true} value={this.state.password} onChangeText={password => this.setState({password})}/>
                    </Item>

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Confirm Password' placeholderTextColor='white' secureTextEntry={true} value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button rounded style={styles.loginButton} onPress={() => this.verifyValidCredentials()}>
                            <Text style={styles.loginButtonText}>Sign Up</Text>
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
