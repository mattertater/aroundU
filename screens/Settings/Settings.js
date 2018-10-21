import React from 'react';
import {
    Text,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {Item, Button } from 'native-base';
import colors from '../../config/Colors.js'
import firebase from '../../config/Firebase';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _signOutAsync = async () => {
        firebase.auth().signOut().then( () => {
             AsyncStorage.clear().then(async () => {
                this.props.navigation.navigate('SignIn');
            })
          }).catch(function(error) {
            console.log(error);
          });
    };
    
    render(){
        return(

            <Item style={styles.noUnderline}>
                <Button rounded style={styles.logoutButton} onPress={this._signOutAsync.bind(this)}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </Button>
            </Item>
        );
    }
}
    const styles = StyleSheet.create({
    temp: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUnderline: {
        borderColor: 'transparent',
    },
    logoutButtonText: {
        color: colors.black,
    },
    loginTextBox: {
        minWidth: 250,
    },
    logoutButton: {
        marginTop: 20,
        width: 150,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        borderColor: 'transparent',
    },
    });

    export default Settings;
