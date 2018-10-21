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
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider, Button, Toast, Icon } from 'native-base';
import Common from '../native-base-theme/variables/commonColor';
import getTheme from '../native-base-theme/components';
import firebase from '../config/Firebase.js'
import colors from '../config/Colors.js'

class CreateAccountScreen extends React.Component {

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

    _verifyValidCredentials = async () => {
        const { email, password, confirmPassword } = this.state;
        console.log('validating credentials');
        console.log('email ' + email);
        console.log('password' + password);
        console.log('confirmPassword' + confirmPassword);
        if(password.length > 5 && password === confirmPassword){
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
    };

    handleSignUp = () => {
        console.log('we enter the function');
        const { email, password } = this.state;
        console.log(email);
        console.log(password);
        this.props.navigation.navigate('ProfileCreation', {email: email, password: password});
    }

    render(){
        return(
            <Container>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>

                    <Button transparent style={styles.backButton} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon type='MaterialIcons' name='arrow-back' style={{ color: colors.white, padding: 0, margin: 0 }}/>
                    </Button>

                    <Item style={[styles.createAccountTitleItem, styles.noUnderline]}>
                        <Text style={styles.createAccountTitle}>Create New Account</Text>
                    </Item>

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
                        <Button rounded style={styles.loginButton} onPress={this._verifyValidCredentials.bind(this)}>
                            <Text style={[styles.loginButtonText, {paddingLeft: 10}]}>More Detail</Text>
                            <Icon type='MaterialIcons' name='navigate-next' style={{ color: colors.blue }}/>
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
    backButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    loginLogo: {
        maxWidth: 175,
        minWidth: 100,
    },
    createAccountTitleItem: {
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
    },
    createAccountTitle: {
        fontSize: 20,
        color: colors.white,
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
        minWidth: 300,
        margin: 10,
        borderRadius: 5,
        backgroundColor: colors.darkBlue,
    },
    loginText: {
        color: colors.white,
    }
  });

  export default CreateAccountScreen;
