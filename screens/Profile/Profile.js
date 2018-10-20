import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }
    
   
    render(){
        return(
            <View style={styles.temp}><Text>Profile Screen</Text></View>
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
  });

  export default Profile;
