import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {Item, Button } from 'native-base';
import colors from '../../config/Colors.js'


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };
    
    render(){
        return(
            <View style={styles.container}>
                <Item style={styles.noUnderline}>
                    <Button rounded style={styles.logoutButton} onPress={this._signOutAsync.bind(this)}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </Button>
                </Item>
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
