import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { Item, Icon, Button, Container, Header } from 'native-base';
import firebase from '../../config/Firebase.js';
import colors from '../../config/Colors.js';
import Expo from 'expo';

var user, name, email, photoUrl, uid, emailVerified;

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentWillMount() {
        user = firebase.auth().currentUser;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid;
        }
    }

    componentDidMount() {
    }

    render(){
        return(
            <Container>
                <View style={styles.container}>
                    <Header style={styles.navHeader} 
                        placement="left"
                        leftComponent={{ icon: 'menu', color: colors.white }}
                        centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'map', color: colors.white }}
                    />

                    <Button transparent style={styles.backButton} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon type='MaterialIcons' name='arrow-back' style={{ color: colors.white }}/>
                    </Button>

                    <Item style={styles.noUnderline}>
                        <Text style={styles.profileNameText}>Name: {name}</Text>
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Image source={{ uri: photoUrl }} style={[styles.profilePicture, { width: 150, height: 150, borderRadius: 100 }]} />
                    </Item>

                    <Item style={styles.noUnderline}>
                        <Text>Email: {email}</Text>
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
  });

  export default Profile;
