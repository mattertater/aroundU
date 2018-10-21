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
import firebase from '../config/Firebase.js'
import colors from '../config/Colors.js'

class ProfileCreationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          email: this.props.navigation.state.params.email,
          password: this.props.navigation.state.params.password,
          firstName: '',
          lastName: '',
          school: '',
          image: '',
          showToast: false,
        };
    }

    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };


    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result });
        }
    };

    _sendProfileInfoToFirebase = async () => {
        const { firstName, lastName, school, image, email, password } = this.state;
        // Registers user -- auth is listening and will redirect file to Map
        const response = await fetch(image.uri);
        const blob = await response.blob();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            console.log('User successfully created');
            // Stores profile picture in the storage database -- there is currently no check to determine whether or not the image URI is null
            firebase.storage().ref().child('ProfilePictures/').child(firstName+lastName+'profilePic.jpg').put(blob).then((uploadedFile) => {
                // Sends Profile Info to Relational db
                uploadedFile.ref.getDownloadURL().then(function (downloadURL) {                    
                    firebase.database().ref('Users/').push({
                        firstName,
                        lastName,
                        school,
                        email,
                        downloadURL,
                    }).then((data, downloadURL)=>{
                        console.log('successfully added Profile Info: ' + data);
                        // Adds display name and photoURI to auth
                        firebase.auth().currentUser.updateProfile({
                            displayName: firstName + ' ' + lastName,
                            photoURL: downloadURL
                        }); // updateProfile catch
                });
                }).catch( error=>{
                console.log('failed to update profile info: ' + error.message);
                })
            }).catch( error => {
                console.log('failed to upload file: ' + error.message);
            }); // createUserWithEmailAndPassword Catch
        }).catch(error => {
            console.log('failed to create a user: ' + error.message); 
        });
          
    }

    render(){
        return(
            <Container>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    <Button transparent style={styles.backButton} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon type='MaterialIcons' name='arrow-back' style={{ color: colors.white }}/>
                    </Button>

                    <Item style={styles.noUnderline}>
                    {this.state.image ? (
                        <Image source={{ uri: this.state.image.uri }} style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} />
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
                        <Input style={styles.loginText} placeholder='First Name' placeholderTextColor='white' value={this.state.firstName} onChangeText={firstName => this.setState({firstName})}/>
                    </Item>
                    
                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='Last Name' placeholderTextColor='white' value={this.state.lastName} onChangeText={lastName => this.setState({lastName})} />
                    </Item>

                    <Item style={[styles.loginTextBox, styles.noUnderline]}>
                        <Input style={styles.loginText} placeholder='School' placeholderTextColor='white' value={this.state.school} onChangeText={school => this.setState({school})}/>
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Button rounded style={styles.loginButton} onPress={this._sendProfileInfoToFirebase.bind(this)}>
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
