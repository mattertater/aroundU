import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { Item, Icon, Button, Container } from 'native-base';
import firebase from '../../config/Firebase.js';
import colors from '../../config/Colors.js';
import Expo from 'expo';

var authUser, user, name, email, downloadURL, uid;

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userFound: false
        };
    }
    
    componentWillMount = async () => {
        authUser = firebase.auth().currentUser;
        if (authUser != null) {
            email = authUser.email;
        }
        let thisUser = {email : 'Kejr@ntnr.com'};
        let ref = firebase.database().ref("Users");
        ref.orderByKey().on('value', function(database) {
            database.forEach(function (profile) {
                var profileUser = profile.val(); 
                if (profileUser.email == thisUser.email) {
                    user = profileUser;
                    console.log("found a match: " + user.firstName);
                }
            });
        });
    }

    componentDidMount() {
    }

    render(){
        return(
            <Container>
                <View style={styles.container}>
                    
                    <Button transparent style={styles.backButton} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon type='MaterialIcons' name='arrow-back' style={{ color: colors.white }}/>
                    </Button>

                    <Item style={styles.noUnderline}>
                    { this.state.userFound ? (
                        <Text style={styles.profileNameText}>Name: {user.firstName} {user.lastName}</Text>
                    ) : (
                        <Text style={styles.profileNameText}>Name:</Text>
                    ) }
                    </Item>

                    <Item style={styles.noUnderline}>
                    { this.state.userFound ? (
                        <Image source={{ uri: user.downloadURL }} style={[styles.profilePicture, { width: 150, height: 150, borderRadius: 100 }]} />
                    ) : (
                        <Image source={require('../../assets/images/defaultProfilePicture.jpg')} style={[styles.profilePicture, { width: 150, height: 150, borderRadius: 100 }]} />
                    )}
                        
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Text>Email: {email}</Text>
                    </Item>

                    <Button transparent style={styles.mapMenu} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name='menu' style={{ width: 20, height: 20, color: colors.darkBlue }}/>
                    </Button>
                </View>
            </Container>
        );
    }
}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
    },
    noUnderline: {
        borderColor: 'transparent',
    },
    navHeader: {
        elevation: 0,
        marginTop: Expo.Constants.statusBarHeight,
        backgroundColor: colors.blue,
    },
    profileNameText: {
        width: 400,
        fontSize: 30,
    },
    mapMenu: {
        position: 'absolute',
        left: 15,
        top: 15,
    },
  });

  export default Profile;
