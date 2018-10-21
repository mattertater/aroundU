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

import { ImagePicker } from 'expo';

import AuthLoadingScreen from '../components/Auth.js';
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider, Button, Toast, Icon } from 'native-base';
import Common from '../native-base-theme/variables/commonColor';
import getTheme from '../native-base-theme/components';
// import firebase from '../config/Firebase.js'
import colors from '../config/Colors.js'

class ProfileCreationScreen extends React.Component {

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

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render(){
        let { image } = this.state;
        if (!this.state.isFontReady) {
            return <Expo.AppLoading />;
        }
        return(
            <Container>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>

                    <Button transparent style={styles.backButton} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon type='MaterialIcons' name='arrow-back' style={{ color: colors.white }}/>
                    </Button>

                    <Item style={styles.noUnderline}>
                    {image ? (
                        <Image source={{ uri: image }} style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} />
                    ) : (
                        <Image source={require('../assets/images/defaultProfilePicture.jpg')} style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} />     
                    )}
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button rounded style={styles.uploadButton} onPress={this._pickImage}>
                            <Text style={styles.uploadButtonText}>Upload an image</Text>
                            <Icon type='MaterialIcons' name='add-a-photo' style={{ color: colors.blue }}/>
                        </Button>
                    </Item>

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='First Name' placeholderTextColor='white'/>
                    </Item>
                    
                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Last Name' placeholderTextColor='white' />
                    </Item>

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='School' placeholderTextColor='white' />
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button rounded style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Finish</Text>
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
    profilePicture: {
        borderWidth: 5,
        borderColor: colors.darkBlue,
        marginBottom: 15,
    },
    uploadButton: {
        backgroundColor: colors.yellow,
        width: 200,
        marginBottom: 35,
        justifyContent: 'center',
    },
    uploadButtonText: {
        color: colors.black,
    },
    loginButton: {
        marginTop: 20,
        width: 150,
        padding: -10,
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

  export default ProfileCreationScreen;
