import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {Item, Button, Icon} from 'native-base';
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
            <View style={styles.container}>

                <Item style={styles.noUnderline}>
                    <Text style={{fontSize: 30, color: colors.white}}>Settings</Text>
                </Item>

                <Item style={styles.noUnderline}>
                    <Button rounded style={styles.logoutButton} onPress={this._signOutAsync.bind(this)}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </Button>
                </Item>

                <Button transparent style={styles.mapMenu} onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' style={{ width: 20, height: 20, color: colors.white }}/>
                </Button>
            </View>
        );
    }
}
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
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
        position: 'absolute',
        bottom: 50,
        width: 150,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
    },
    mapMenu: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    });

    export default Settings;
